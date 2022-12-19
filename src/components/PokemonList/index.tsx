import Image from 'next/image'
import { Pokemon } from '../../context/PokemonContext'
import {
  Card,
  PokemonInformationContainer,
  PokemonListContainer,
  TypeList,
} from './styles'

interface PokemonListProps {
  pokemonList: Pokemon[]
}

export function PokemonList({ pokemonList }: PokemonListProps) {
  const capitalize = (text: string) =>
    `${text.charAt(0).toUpperCase()}${text.slice(1)}`

  const formatName = (name: string) =>
    name
      .split('-')
      .map((name) => capitalize(name))
      .join(' ')

  pokemonList.sort((a, b) => {
    return a.id - b.id
  })

  return (
    <PokemonListContainer>
      <h2>My Favorite Pokemon:</h2>
      {pokemonList.map((pokemon) => (
        <Card key={pokemon.id}>
          <Image src={pokemon.sprite} width={100} height={100} alt="" />

          <PokemonInformationContainer>
            {formatName(pokemon.name)}
            <TypeList>
              {pokemon.types.map((type, i) => (
                <li key={i}>{type}</li>
              ))}
            </TypeList>
          </PokemonInformationContainer>
        </Card>
      ))}
    </PokemonListContainer>
  )
}
