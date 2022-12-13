import { MagnifyingGlass } from 'phosphor-react'
import { FormEvent, useContext, useState } from 'react'
import { PokemonContext } from '../../context/PokemonContext'
import { FormContainer, SearchButton, SearchInput } from './styles'

export function PokemonSearchBar() {
  const [inputContent, setInputContent] = useState('')
  const { searchPokemon } = useContext(PokemonContext)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    searchPokemon(inputContent)
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="Search for Pokemon name or id"
        value={inputContent}
        onChange={(event) => setInputContent(event.target.value)}
      />
      <SearchButton type="submit">
        <MagnifyingGlass size={20} weight="bold" /> Search
      </SearchButton>
    </FormContainer>
  )
}
