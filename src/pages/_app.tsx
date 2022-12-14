import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { globalStyles } from '../styles/global'
import { SessionProvider } from 'next-auth/react'
import { AppContainer } from '../styles/pages/App/styles'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppContainer>
        <Header />
        <Component {...pageProps} />
      </AppContainer>
    </SessionProvider>
  )
}
