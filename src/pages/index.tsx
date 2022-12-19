import Head from 'next/head'
import { PageController } from '../components/PageController'
import { PokemonDisplay } from '../components/PokemonDisplay'
import { PokemonSearchBar } from '../components/PokemonSearchBar'
import { PokemonContextProvider } from '../context/PokemonContext'
import { HomeContainer } from '../styles/pages/Home/styles'

export default function Home() {
  return (
    <PokemonContextProvider>
      <HomeContainer>
        <Head>
          <title>Pokedex | Home</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <PokemonSearchBar />
        <PokemonDisplay />
        <PageController />
      </HomeContainer>
    </PokemonContextProvider>
  )
}
