import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {
  HeaderContainer,
  HeaderItems,
  LoginButton,
  Logo,
  NavContainer,
} from './styles'

export function Header() {
  const { data: session } = useSession()

  function handleSignOut() {
    signOut()
  }

  return (
    <HeaderContainer>
      <HeaderItems>
        <Link href={'/'}>
          <Logo>
            André Chamis <strong>Pokedex</strong>
          </Logo>
        </Link>
        {session ? (
          <NavContainer>
            <Link href={`/profile/${session.user?.id}`}>My profile</Link>
            <LoginButton onClick={handleSignOut}>Logout</LoginButton>
          </NavContainer>
        ) : (
          <LoginButton href={'/login'}>Login</LoginButton>
        )}
      </HeaderItems>
    </HeaderContainer>
  )
}
