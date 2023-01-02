import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { Pokemon } from '../../context/PokemonContext'
import { api } from '../../lib/axios'
import { LikeButton } from '../LikeButton'
import { PokemonCardContainer, PokemonInfo, TypeList } from './styles'

interface PokemonCardProps {
  pokemon: Pokemon
  isPokemonAlreadyLiked: boolean
  handleAddLikedPokemonList: (targetPokemonId: number) => void
  handleRemoveLikedPokemonList: (targetPokemonId: number) => void
}

export function PokemonCard({
  pokemon,
  isPokemonAlreadyLiked,
  handleAddLikedPokemonList,
  handleRemoveLikedPokemonList,
}: PokemonCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { data: session } = useSession()
  const capitalize = (text: string) =>
    `${text.charAt(0).toUpperCase()}${text.slice(1)}`

  const name = pokemon.name
    .split('-')
    .map((name) => capitalize(name))
    .join(' ')

  async function handleDislikePokemon() {
    setIsUpdating(true)
    try {
      await api.delete('/api/pokemon/dislike', {
        data: {
          userId: session?.user?.id,
          pokemonId: pokemon.id,
        },
      })
      handleRemoveLikedPokemonList(pokemon.id)
    } catch (error) {}
    setIsUpdating(false)
  }

  async function handleLikePokemon() {
    setIsUpdating(true)
    try {
      await api.post('/api/pokemon/like', {
        data: {
          userId: session?.user?.id,
          pokemonId: pokemon.id,
        },
      })
      handleAddLikedPokemonList(pokemon.id)
    } catch (error) {}
    setIsUpdating(false)
  }

  return (
    <PokemonCardContainer>
      <LikeButton
        isLiked={isPokemonAlreadyLiked}
        isUpdating={isUpdating}
        handleClick={
          isPokemonAlreadyLiked ? handleDislikePokemon : handleLikePokemon
        }
      />
      <Image src={pokemon.sprite} width={100} height={100} alt="" />
      <PokemonInfo>
        <p>
          <strong>ID:</strong> {pokemon.id}
        </p>
        |<p>{capitalize(name)}</p>
      </PokemonInfo>
      <TypeList>
        {pokemon.types.map((type, i) => (
          <li key={i}>{capitalize(type)}</li>
        ))}
      </TypeList>
    </PokemonCardContainer>
  )
}
