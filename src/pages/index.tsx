import { PageController } from '../components/PageController'
import { PokemonDisplay } from '../components/PokemonDisplay'
import { PokemonSearchBar } from '../components/PokemonSearchBar'
import { PokemonContextProvider } from '../context/PokemonContext'
import { HomeContainer } from '../styles/pages/Home/styles'

export default function Home() {
  return (
    <PokemonContextProvider>
      <HomeContainer>
        <PokemonSearchBar />
        <PokemonDisplay />
        <PageController />
      </HomeContainer>
    </PokemonContextProvider>
  )
}
