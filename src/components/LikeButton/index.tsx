import { useState } from 'react'
import { LikeButtonContainer, LikeButtonIcon } from './styles'
import { useSession } from 'next-auth/react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { MustBeLoggedInDialog } from '../AlertDialog'

interface LikeButtonProps {
  isUpdating: boolean
  isLiked?: boolean
  handleClick?: () => void
}

export function LikeButton({
  isLiked,
  isUpdating,
  handleClick,
}: LikeButtonProps) {
  const [isLikeButtonHover, setIsLikeButtonHover] = useState(false)
  const { data: session } = useSession()

  if (!session) {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <LikeButtonIcon
            onMouseEnter={
              isLiked
                ? () => {}
                : () => {
                    setIsLikeButtonHover(true)
                  }
            }
            onMouseLeave={
              isLiked
                ? () => {}
                : () => {
                    setIsLikeButtonHover(false)
                  }
            }
            weight={isLikeButtonHover ? 'fill' : 'regular'}
          />
        </AlertDialog.Trigger>
        <MustBeLoggedInDialog />
      </AlertDialog.Root>
    )
  }

  return (
    <LikeButtonContainer disabled={isUpdating} onClick={handleClick}>
      <LikeButtonIcon
        onMouseEnter={
          isLiked
            ? () => {}
            : () => {
                setIsLikeButtonHover(true)
              }
        }
        onMouseLeave={
          isLiked
            ? () => {}
            : () => {
                setIsLikeButtonHover(false)
              }
        }
        weight={
          isUpdating
            ? 'fill'
            : isLiked
            ? 'fill'
            : isLikeButtonHover
            ? 'fill'
            : 'regular'
        }
      />
    </LikeButtonContainer>
  )
}
