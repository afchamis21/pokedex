import { GetServerSideProps } from 'next'
import { unstable_getServerSession as unstableGetServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import PokeAPI from 'pokedex-promise-v2'
import { useCallback, useEffect, useState } from 'react'
import { FriendsList } from '../../components/FriendsList'
import { PokemonList } from '../../components/PokemonList'
import { UserCard } from '../../components/UserCard'
import { UserList } from '../../components/UserList'
import { Pokemon } from '../../context/PokemonContext'
import { api } from '../../lib/axios'
import { pokedex } from '../../lib/pokedex'
import {
  ProfileContainer,
  SocialSectionContainer,
} from '../../styles/pages/Profile'
import { getUserInformation } from '../../utils/get-user-information'
import { IsLoggedInUser } from '../../utils/is-logged-in-user'
import { authOptions } from '../api/auth/[...nextauth]'

export interface UserInformationType {
  name?: string
  image?: string
  id: string
}

interface ProfileProps {
  likedPokemonList: Pokemon[]
  isLoggedInUser: boolean
  userInformation: UserInformationType
}

interface RemoveFriendRequestArgs {
  userId: string
  friendId: string
}

interface AddFriendRequestArgs {
  userId: string
  newFriendId: string
}

export default function Profile({
  likedPokemonList,
  isLoggedInUser,
  userInformation,
}: ProfileProps) {
  const { data: session } = useSession()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  const [userList, setUserList] = useState<UserInformationType[]>([])
  const [friendsList, setFriendsList] = useState<UserInformationType[]>([])

  useEffect(() => {
    async function fetchIsFriend(): Promise<void> {
      if (isLoggedInUser) {
        setIsFriend(false)
        return
      }

      const response = await api.get('/api/user/friends', {
        params: {
          userId: userInformation.id,
          targetPage: 1,
          paginationSize: 6,
        },
      })

      const friendsList: UserInformationType[] = response.data.friendsList

      const isLoggedInUserOnFriendsList = !!friendsList.find(
        (user) => user.id === session?.user?.id,
      )

      setIsFriend(isLoggedInUserOnFriendsList)
    }

    fetchIsFriend()
  }, [isLoggedInUser, session?.user?.id, userInformation.id])

  async function handleRemoveFriend({
    userId,
    friendId,
  }: RemoveFriendRequestArgs) {
    setIsUpdating(true)

    await api.delete('/api/user/friends', {
      data: {
        userId,
        friendId,
      },
    })

    setIsUpdating(false)

    const deletedFriend = friendsList?.find((friend) => friend.id === friendId)

    if (deletedFriend) {
      setFriendsList((state) =>
        state?.filter((friend) => friend.id !== deletedFriend?.id),
      )
      setUserList((state) => [...state, deletedFriend])
    }
  }

  async function handleAddFriend({
    userId,
    newFriendId,
  }: AddFriendRequestArgs) {
    setIsUpdating(true)

    await api.post('/api/user/friends', {
      data: {
        userId,
        newFriendId,
      },
    })

    setIsUpdating(false)

    const addedFriend = userList?.find((user) => user.id === newFriendId)

    if (addedFriend) {
      setFriendsList((state) => [...state, addedFriend])
      setUserList((state) =>
        state?.filter((friend) => friend.id !== addedFriend?.id),
      )
    }
  }

  const handleSetUserList = useCallback((newUserList: any) => {
    setUserList(newUserList)
  }, [])

  const handleSetFriendsList = useCallback((newFriendsList: any) => {
    setFriendsList(newFriendsList)
  }, [])

  return (
    <ProfileContainer>
      <Head>
        <title>Pokedex | Profile</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <SocialSectionContainer>
        <UserCard
          userInfo={userInformation}
          isLoggedInUser={isLoggedInUser}
          showActionButtons={false}
          isFriend={isFriend}
          isUpdating={isUpdating}
          handleAddFriend={() => {
            handleAddFriend({
              newFriendId: userInformation.id,
              userId: session?.user?.id!,
            })
          }}
        />
        {isLoggedInUser && (
          <UserList
            isUpdating={isUpdating}
            userId={userInformation.id}
            userList={userList}
            handleAddFriend={handleAddFriend}
            handleSetUserList={handleSetUserList}
          />
        )}
      </SocialSectionContainer>
      <FriendsList
        isLoggedInUser={isLoggedInUser}
        isUpdating={isUpdating}
        userInfo={userInformation}
        friendsList={friendsList}
        handleRemoveFriend={handleRemoveFriend}
        handleSetFriendsList={handleSetFriendsList}
      />
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

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {},
    }
  }

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

  const likedPokemonIds: number[] = response.data.likedPokemon

  const pokeList = (await pokedex.getPokemonByName(
    likedPokemonIds,
  )) as PokeAPI.Pokemon[]

  const likedPokemonList: Pokemon[] = pokeList.map((pokemon) => {
    const types = pokemon.types.map((type) => type.type.name)

    const formattedPokemon: Pokemon = {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default!,
      types,
    }

    return formattedPokemon
  })

  return {
    props: { likedPokemonList, isLoggedInUser, userInformation },
  }
}
