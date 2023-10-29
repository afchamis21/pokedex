import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { globalStyles } from '../styles/global'
import { AppContainer } from '../styles/pages/App/styles'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AppContainer>
      <Header />
      <Component {...pageProps} />
    </AppContainer>
  )
}
