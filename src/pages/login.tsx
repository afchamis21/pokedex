import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GithubLogo, GoogleLogo } from 'phosphor-react'
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

  function handleGithubSignIn() {
    signIn('github')
  }

  if (session) {
    router.push('/')
  }

  return (
    <LoginContainer>
      <Head>
        <title>Pokedex | Login</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <LoginMenu>
        {session ? (
          <h2>You&apos;re already logged in!</h2>
        ) : (
          <>
            <h3>Login using your Google or Github account</h3>
            <LogInButton onClick={handleGoogleSignIn}>
              <GoogleLogo weight="bold" size={24} /> Login with Google
            </LogInButton>
            <LogInButton onClick={handleGithubSignIn}>
              <GithubLogo weight="bold" size={24} /> Login with Github
            </LogInButton>
          </>
        )}
      </LoginMenu>
    </LoginContainer>
  )
}

// <LoginButton onClick={handleSignIn}>Login</LoginButton>
