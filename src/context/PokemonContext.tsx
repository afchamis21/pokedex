import PokeAPI from 'pokedex-promise-v2'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { pokedex } from '../lib/pokedex'

export interface Pokemon {
  id: number
  name: string
  sprite: string
  types: string[]
}

interface PokemonContextType {
  pokemonList: Pokemon[]
  pageLimit: number
  isLoading: boolean
  currentPage: number
  availablePages: number[]
  setAvailablePages: Dispatch<SetStateAction<number[]>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  searchPokemon: (searchString: string) => void
  fetchSpecificPage: (targetPage: number, amount?: number) => void
  fetchNextPage: () => void
  fetchPreviousPage: () => void
}

export const PokemonContext = createContext({} as PokemonContextType)

interface PokemonContextProviderProps {
  children: ReactNode
}

export function PokemonContextProvider({
  children,
}: PokemonContextProviderProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [availablePages, setAvailablePages] = useState([1, 2, 3, 4, 5])
  const pageLimit = 9

  useEffect(() => {
    fetchSpecificPage(currentPage)
  }, [currentPage])

  async function fetchSpecificPage(targetPage: number, amount = pageLimit) {
    setIsLoading(true)

    const idList = [...Array(amount)].map(
      (_, index) => index + 1 + amount * (targetPage - 1),
    )

    const pokemons = (await pokedex.getPokemonByName(
      idList,
    )) as PokeAPI.Pokemon[]

    setPokemonList(
      pokemons.map((pokemon) => {
        const types = pokemon.types.map((type) => type.type.name)
        const formattedPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprites.front_default!,
          types,
        }

        return formattedPokemon
      }),
    )
    setIsLoading(false)
  }

  async function searchPokemon(searchString: string) {
    setIsLoading(true)
    if (searchString.length === 0) {
      setCurrentPage(1)
      setAvailablePages([1, 2, 3, 4, 5])
      fetchSpecificPage(1)
      return
    }

    try {
      const response = (await pokedex.getPokemonByName(
        searchString.toLocaleLowerCase(),
      )) as PokeAPI.Pokemon

      const types = response.types.map((type) => type.type.name)
      const formattedPokemon = {
        id: response.id,
        name: response.name,
        sprite: response.sprites.front_default!,
        types,
      }

      setPokemonList([formattedPokemon])
    } catch (error) {
      setPokemonList([])
    }
    setIsLoading(false)
  }

  function fetchNextPage() {
    setCurrentPage((state) => state + 1)
  }

  function fetchPreviousPage() {
    setCurrentPage((state) => state - 1)
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        pageLimit,
        isLoading,
        availablePages,
        currentPage,
        setAvailablePages,
        setCurrentPage,
        searchPokemon,
        fetchSpecificPage,
        fetchNextPage,
        fetchPreviousPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
