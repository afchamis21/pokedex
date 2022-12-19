import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../../context/PokemonContext'
import { api } from '../../lib/axios'
import { PokemonCard } from '../PokemonCard'
import { Spinner } from '../Spinner'
import { GridContainer } from './styles'

export function PokemonDisplay() {
  const { pokemonList, isLoading } = useContext(PokemonContext)
  const [likedPokemonList, setLikedPokemonList] = useState<number[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    getLikedPokemonList()

    async function getLikedPokemonList() {
      if (session) {
        const response = await api.get('api/pokemon', {
          params: {
            userId: session.user?.id,
          },
        })

        setLikedPokemonList(response.data.likedPokemon)
      }
    }
  }, [session, setLikedPokemonList])

  function handleAddLikedPokemonList(targetPokemonId: number) {
    setLikedPokemonList((state) => [...state, targetPokemonId])
  }

  function handleRemoveLikedPokemonList(targetPokemonId: number) {
    setLikedPokemonList((state) =>
      state.filter((pokemonId) => targetPokemonId !== pokemonId),
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  if (pokemonList.length === 0) {
    return <h1>Pokemon not found!</h1>
  }

  return (
    <GridContainer>
      {pokemonList.map((pokemon) => {
        return (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isPokemonAlreadyLiked={likedPokemonList.includes(pokemon.id)}
            handleAddLikedPokemonList={handleAddLikedPokemonList}
            handleRemoveLikedPokemonList={handleRemoveLikedPokemonList}
          />
        )
      })}
    </GridContainer>
  )
}
