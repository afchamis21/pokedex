import Image from 'next/image'
import { useState } from 'react'
import { Pokemon } from '../../context/PokemonContext'
import { LikeButton } from '../LikeButton'
import { PokemonCardContainer, TypeList } from './styles'

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  function toggleIsLiked() {
    setIsLiked((state) => !state)
  }

  const capitalize = (text: string) =>
    `${text.charAt(0).toUpperCase()}${text.slice(1)}`

  const name = pokemon.name.includes('-')
    ? pokemon.name
        .split('-')
        .map((name) => capitalize(name))
        .join(' ')
    : capitalize(pokemon.name)

  return (
    <PokemonCardContainer>
      <LikeButton isLiked={isLiked} handleClick={toggleIsLiked} />
      <Image src={pokemon.sprite} width={100} height={100} alt="" />
      <p>{capitalize(name)}</p>
      <TypeList>
        {pokemon.types.map((type, i) => (
          <li key={i}>{capitalize(type)}</li>
        ))}
      </TypeList>
    </PokemonCardContainer>
  )
}
