import Link from 'next/link'
import { HeaderContainer, HeaderItems, LoginButton, Logo } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderItems>
        <Link href={'/'}>
          <Logo>
            André Chamis <strong>Pokedex</strong>
          </Logo>
        </Link>
        <LoginButton>Log In</LoginButton>
      </HeaderItems>
    </HeaderContainer>
  )
}
