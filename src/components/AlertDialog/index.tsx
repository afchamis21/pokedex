import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useRouter } from 'next/router'
import { Overlay, Content, ButtonsContainer, Cancel, Action } from './styles'

export function MustBeLoggedInDialog() {
  const router = useRouter()

  function handleGoToLogin() {
    router.push('/login')
  }

  return (
    <AlertDialog.Portal>
      <Overlay />
      <Content>
        <AlertDialog.Title>Must be logged in to like pokemon</AlertDialog.Title>
        <ButtonsContainer>
          <Cancel>Cancel</Cancel>
          <Action onClick={handleGoToLogin}>Go to Login</Action>
        </ButtonsContainer>
      </Content>
    </AlertDialog.Portal>
  )
}
