import axios from 'axios'
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

interface apiPaginationURLType {
  next?: string
  previous?: string
}

interface PokemonContextType {
  pokemonList: Pokemon[]
  pageLimit: number
  apiPaginationURL: apiPaginationURLType
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
  const [apiPaginationURL, setApiPaginationURL] =
    useState<apiPaginationURLType>({})

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [availablePages, setAvailablePages] = useState([1, 2, 3, 4, 5])
  const pageLimit = 9

  useEffect(() => {
    fetchSpecificPage(1)
  }, [])

  async function fetchSpecificPage(targetPage: number, amount = pageLimit) {
    setIsLoading(true)
    // const response = await axios.get(
    //   `https://pokeapi.co/api/v2/pokemon?offset=${
    //     amount * (targetPage - 1)
    //   }&limit=${amount}`,
    // )

    // console.log(response.data)

    // setApiPaginationURL({
    //   next: response.data.next,
    //   previous: response.data.previous,
    // })

    // const pokemons = await axios.all(
    //   response.data.results.map((result: { name: string; url: string }) =>
    //     axios.get(result.url),
    //   ),
    // )

    const idList = [...Array(amount)].map(
      (_, index) => index + 1 + amount * (targetPage - 1),
    )

    console.log(idList)

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
      fetchSpecificPage(1)
      setCurrentPage(1)
      setAvailablePages([1, 2, 3, 4, 5])
      return
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchString.toLowerCase()}`,
      )

      const types = response.data.types.map((type: any) => type.type.name)

      const pokemon: Pokemon = {
        id: response.data.id,
        name: response.data.name,
        sprite: response.data.sprites.front_default,
        types,
      }

      setPokemonList([pokemon])
      setApiPaginationURL({})
    } catch (error) {
      setPokemonList([])
    }
    setIsLoading(false)
  }

  async function fetchNextPage() {
    setIsLoading(true)
    const response = await axios.get(apiPaginationURL.next!)

    setApiPaginationURL({
      next: response.data.next,
      previous: response.data.previous,
    })

    const pokemons = await axios.all(
      response.data.results.map((result: { name: string; url: string }) =>
        axios.get(result.url),
      ),
    )

    setPokemonList(
      pokemons.map((pokemon: any) => {
        const types = pokemon.data.types.map((type: any) => type.type.name)
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          sprite: pokemon.data.sprites.front_default,
          types,
        }
      }),
    )
    setIsLoading(false)
  }

  async function fetchPreviousPage() {
    setIsLoading(true)
    const response = await axios.get(apiPaginationURL.previous!)

    setApiPaginationURL({
      next: response.data.next,
      previous: response.data.previous,
    })

    const pokemons = await axios.all(
      response.data.results.map((result: { name: string; url: string }) =>
        axios.get(result.url),
      ),
    )

    setPokemonList(
      pokemons.map((pokemon: any) => {
        const types = pokemon.data.types.map((type: any) => type.type.name)
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          sprite: pokemon.data.sprites.front_default,
          types,
        }
      }),
    )
    setIsLoading(false)
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        pageLimit,
        apiPaginationURL,
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
