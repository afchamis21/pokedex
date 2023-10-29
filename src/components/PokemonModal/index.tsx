import * as Dialog from '@radix-ui/react-dialog'
import {
  Close,
  Content,
  ImageContainer,
  Information,
  InformationContainer,
  Overlay,
  Summary,
} from './styles'
import { useEffect, useState } from 'react'
import { pokedex } from '../../lib/pokedex'
import PokeAPI, { Pokemon } from 'pokedex-promise-v2'
import { Spinner } from '../Spinner'
import { CaretLeft, CaretRight, X } from 'phosphor-react'
import { capitalize } from '../../utils/capitalize'
import Image from 'next/image'
import { PokemonInfo, TypeList } from '../PokemonCard/styles'

interface PokemonModalProps {
  pokemonId: number
}

export function PokemonModal({ pokemonId }: PokemonModalProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isFetchingPokemon, setIsFetchingPokemon] = useState(false)
  const [activeSprite, setActiveSprite] = useState(0)
  useEffect(() => {
    async function getPokemon() {
      setIsFetchingPokemon(true)
      const pokemonResponse = (await pokedex.getPokemonByName(
        pokemonId,
      )) as PokeAPI.Pokemon

      setPokemon(pokemonResponse)
      setIsFetchingPokemon(false)
    }

    getPokemon()
  }, [pokemonId])

  const sprites = [
    pokemon?.sprites.front_default,
    pokemon?.sprites.back_default,
    pokemon?.sprites.front_shiny,
    pokemon?.sprites.back_shiny,
    pokemon?.sprites.front_female,
    pokemon?.sprites.back_female,
    pokemon?.sprites.front_shiny_female,
    pokemon?.sprites.back_shiny_female,
  ].filter((sprite) => sprite !== null && sprite !== undefined)

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        {isFetchingPokemon ? (
          <Spinner />
        ) : pokemon === null ? (
          <>
            <Dialog.Title>
              Oops, something happened! Try again in a few seconds
            </Dialog.Title>
            <Close>
              <X />
            </Close>
          </>
        ) : (
          <InformationContainer>
            <Summary>
              <ImageContainer>
                <button
                  type="button"
                  disabled={activeSprite === 0}
                  onClick={() => {
                    if (activeSprite <= 0) {
                      return
                    }
                    setActiveSprite((val) => val - 1)
                  }}
                >
                  <CaretLeft size={18} />
                </button>
                <Image
                  src={sprites.at(activeSprite)!}
                  width={100}
                  height={100}
                  alt=""
                />
                <button
                  type="button"
                  disabled={activeSprite === sprites.length - 1}
                  onClick={() => {
                    if (activeSprite >= sprites.length - 1) {
                      return
                    }
                    setActiveSprite((val) => val + 1)
                  }}
                >
                  <CaretRight size={18} />
                </button>
              </ImageContainer>
              <PokemonInfo>
                <p>
                  <strong>ID:</strong> {pokemon.id}
                </p>
                |<p>{capitalize(pokemon.name)}</p>
              </PokemonInfo>
              <TypeList>
                {pokemon.types.map((type, i) => (
                  <li key={i}>{capitalize(type.type.name)}</li>
                ))}
              </TypeList>
            </Summary>
            <Information>
              <p>Height: {pokemon.height / 10} m.</p>
              <p>Weight: {pokemon.weight / 10} kg.</p>
              <ul>
                Abilities:
                {pokemon.abilities.map((ab) => (
                  <li key={ab.ability.name}>{capitalize(ab.ability.name)}</li>
                ))}
              </ul>
            </Information>
            <Close>
              <X size={18} />
            </Close>
          </InformationContainer>
        )}
      </Content>
    </Dialog.Portal>
  )
}
