import { CaretLeft, CaretRight } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../../context/PokemonContext'
import { PageControllerContainer, PageIndicator } from './styles'

export function PageController() {
  const [currentPage, setCurrentPage] = useState(1)
  const [availablePages, setAvailablePages] = useState([1, 2, 3, 4, 5])
  const {
    apiPaginationURL,
    fetchNextPage,
    fetchPreviousPage,
    fetchSpecificPage,
    pokemonList,
  } = useContext(PokemonContext)

  useEffect(() => {
    if (pokemonList.length === 1) {
      setCurrentPage(1)
      setAvailablePages([1])
    } else {
      setAvailablePages([1, 2, 3, 4, 5])
    }
  }, [pokemonList.length])

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
