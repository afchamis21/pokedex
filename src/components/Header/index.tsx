import Link from 'next/link'
import { HeaderContainer, HeaderItems, Logo } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderItems>
        <Link href={'/'}>
          <Logo>
            André Chamis <strong>Pokedex</strong>
          </Logo>
        </Link>
      </HeaderItems>
    </HeaderContainer>
  )
}
