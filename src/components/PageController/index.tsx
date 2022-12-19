import { CaretLeft, CaretRight } from 'phosphor-react'
import { useContext } from 'react'
import { PokemonContext } from '../../context/PokemonContext'
import { PageControllerContainer, PageIndicator } from './styles'

export function PageController() {
  const {
    apiPaginationURL,
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
    setCurrentPage((state) => state - 1)
  }

  function handleIncreasePage() {
    if (currentPage + 1 === availablePages[availablePages.length - 1]) {
      setAvailablePages((state) => state.map((page) => page + 1))
    }

    fetchNextPage()
    setCurrentPage((state) => state + 1)
  }

  function handleSelectPage(targetPage: number) {
    if (targetPage === currentPage) {
      return
    }
    fetchSpecificPage(targetPage)
    setCurrentPage(targetPage)

    if (targetPage === availablePages[availablePages.length - 1]) {
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
      {apiPaginationURL.previous && (
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
      {apiPaginationURL.next && (
        <CaretRight size={32} onClick={handleIncreasePage} />
      )}
    </PageControllerContainer>
  )
}
