import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { GoogleLogo } from 'phosphor-react'
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

  if (session) {
    router.push('/')
  }

  return (
    <LoginContainer>
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

// <LoginButton onClick={handleSignIn}>Login</LoginButton>
