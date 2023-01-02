import * as AlertDialog from '@radix-ui/react-alert-dialog'
import Link from 'next/link'
import { Overlay, Content, ButtonsContainer, Cancel, Action } from './styles'

export function MustBeLoggedInDialog() {
  return (
    <AlertDialog.Portal>
      <Overlay />
      <Content>
        <AlertDialog.Title>Must be logged in to like pokemon</AlertDialog.Title>
        <ButtonsContainer>
          <Cancel>Cancel</Cancel>
          <Action asChild>
            <Link href={'/login'}>Go to Login</Link>
          </Action>
        </ButtonsContainer>
      </Content>
    </AlertDialog.Portal>
  )
}
