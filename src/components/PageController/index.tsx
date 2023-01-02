import { CaretLeft, CaretRight } from 'phosphor-react'
import { useContext } from 'react'
import { PokemonContext } from '../../context/PokemonContext'
import { PageControllerContainer, PageIndicator } from './styles'

export function PageController() {
  const {
    fetchNextPage,
    fetchPreviousPage,
    fetchSpecificPage,
    pokemonList,
    availablePages,
    currentPage,
    setAvailablePages,
    setCurrentPage,
  } = useContext(PokemonContext)

  function handleDecreasePage() {
    if (currentPage - 1 === availablePages[0] && currentPage - 1 !== 1) {
      setAvailablePages((state) => state.map((page) => page - 1))
    }

    fetchPreviousPage()
  }

  function handleIncreasePage() {
    if (currentPage + 1 === availablePages.at(-1)) {
      setAvailablePages((state) => state.map((page) => page + 1))
    }

    fetchNextPage()
  }

  function handleSelectPage(targetPage: number) {
    if (targetPage === currentPage) {
      return
    }
    fetchSpecificPage(targetPage)
    setCurrentPage(targetPage)

    if (targetPage === availablePages.at(-1)) {
      setAvailablePages((state) => state.map((page) => page + 1))
    }

    if (targetPage === availablePages[0] && targetPage !== 1) {
      setAvailablePages((state) => state.map((page) => page - 1))
    }
  }

  if (pokemonList.length === 0) {
    return (
      <PageIndicator key={1} active={false} disabled>
        1
      </PageIndicator>
    )
  }

  if (pokemonList.length === 1) {
    return (
      <PageIndicator key={1} active={true}>
        1
      </PageIndicator>
    )
  }

  return (
    <PageControllerContainer>
      {currentPage !== 1 && (
        <CaretLeft size={32} onClick={handleDecreasePage} />
      )}
      {availablePages.map((page) => {
        return (
          <PageIndicator
            key={page}
            active={page === currentPage}
            onClick={() => handleSelectPage(page)}
          >
            {page}
          </PageIndicator>
        )
      })}
      <CaretRight size={32} onClick={handleIncreasePage} />
    </PageControllerContainer>
  )
}
