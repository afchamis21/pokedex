import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { HeaderContainer, HeaderItems, LoginButton, Logo } from './styles'

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
          <>
            <LoginButton onClick={handleSignOut}>Logout</LoginButton>
          </>
        ) : (
          <LoginButton href={'/login'}>Login</LoginButton>
        )}
      </HeaderItems>
    </HeaderContainer>
  )
}
