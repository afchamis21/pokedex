import axios from 'axios'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession as unstableGetServerSession } from 'next-auth'
import Head from 'next/head'
import Image from 'next/image'
import { User } from 'phosphor-react'
import { PokemonList } from '../../components/PokemonList'
import { Pokemon } from '../../context/PokemonContext'
import { api } from '../../lib/axios'
import { ProfileContainer, UserInfoContainer } from '../../styles/pages/Profile'
import { getUserInformation } from '../../utils/get-user-information'
import { IsLoggedInUser } from '../../utils/is-logged-in-user'
import { authOptions } from '../api/auth/[...nextauth]'

interface UserInformationType {
  name?: string
  image?: string
  id?: string
}

interface ProfileProps {
  likedPokemonList: Pokemon[]
  isLoggedInUser: boolean
  userInformation: UserInformationType
}

export default function Profile({
  likedPokemonList,
  isLoggedInUser,
  userInformation,
}: ProfileProps) {
  // Aba de amigos (?)

  return (
    <ProfileContainer>
      <Head>
        <title>Pokedex | {userInformation.name}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <UserInfoContainer>
        {userInformation?.image ? (
          <Image alt="" src={userInformation.image} width={100} height={100} />
        ) : (
          <User size={100} />
        )}

        <h2>{userInformation?.name ?? 'User not found'}</h2>
      </UserInfoContainer>
      <PokemonList pokemonList={likedPokemonList} />
    </ProfileContainer>
  )
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({
  query,
  req,
  res,
}) => {
  // User Data:
  const session = await unstableGetServerSession(req, res, authOptions)
  const { id: userId } = query
  const isLoggedInUser = IsLoggedInUser({
    sessionId: session?.user?.id,
    userId,
  })

  const userInformation = isLoggedInUser
    ? {
        name: session?.user?.name!,
        image: session?.user?.image!,
        id: session?.user?.id!,
      }
    : await getUserInformation(userId)

  // Pokemon Data:
  const response = await api.get('api/pokemon', {
    params: {
      userId,
    },
  })

  const likedPokemonIds: Number[] = response.data.likedPokemon

  const likedPokemonResponse = await axios.all(
    likedPokemonIds.map((pokemonId) => {
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    }),
  )

  const likedPokemonList = likedPokemonResponse.map((response) => {
    const types = response.data.types.map((type: any) => type.type.name)

    const pokemon: Pokemon = {
      id: response.data.id,
      name: response.data.name,
      sprite: response.data.sprites.front_default,
      types,
    }

    return pokemon
  })

  return {
    props: { likedPokemonList, isLoggedInUser, userInformation },
  }
}
