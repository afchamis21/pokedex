import { useContext } from 'react'
import { PokemonContext } from '../../context/PokemonContext'
import { PokemonCard } from '../PokemonCard'
import { Spinner } from '../Spinner'
import { GridContainer } from './styles'

export function PokemonDisplay() {
  const { pokemonList, isLoading } = useContext(PokemonContext)

  if (isLoading) {
    return <Spinner />
  }

  if (pokemonList.length === 0) {
    return <h1>Pokemon not found!</h1>
  }

  return (
    <GridContainer>
      {pokemonList.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />
      })}
    </GridContainer>
  )
}
