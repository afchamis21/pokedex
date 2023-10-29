import Image from 'next/image'
import { Pokemon } from '../../context/PokemonContext'
import { PokemonCardContainer, PokemonInfo, TypeList } from './styles'
import { ArrowSquareOut } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { PokemonModal } from '../PokemonModal'

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const capitalize = (text: string) =>
    `${text.charAt(0).toUpperCase()}${text.slice(1)}`

  const name = pokemon.name
    .split('-')
    .map((name) => capitalize(name))
    .join(' ')

  return (
    <PokemonCardContainer>
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
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ArrowSquareOut size={24} />
        </Dialog.Trigger>
        <PokemonModal pokemonId={pokemon.id} />
      </Dialog.Root>
    </PokemonCardContainer>
  )
}
