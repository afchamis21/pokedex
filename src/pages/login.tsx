import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GoogleLogo } from 'phosphor-react'
import { useEffect } from 'react'
import {
  LogInButton,
  LoginContainer,
  LoginMenu,
} from '../styles/pages/LogIn/styles'

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()

  function handleGoogleSignIn() {
    signIn('google')
  }

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [router, session])

  return (
    <LoginContainer>
      <Head>
        <title>Pokedex | Login</title>
        <meta property="og:title" content="Pokedex | Login" key="title" />
        <meta
          name="description"
          content="Come login to Andre Chamis's pokedex"
          key="login-description"
        />
      </Head>
      <LoginMenu>
        {session ? (
          <h2>You&apos;re already logged in!</h2>
        ) : (
          <>
            <h3>Login using your Google account</h3>
            <LogInButton onClick={handleGoogleSignIn}>
              <GoogleLogo weight="bold" size={24} /> Login with Google
            </LogInButton>
          </>
        )}
      </LoginMenu>
    </LoginContainer>
  )
}
