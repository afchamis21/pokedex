import { useState } from 'react'
import { LikeButtonContainer } from './styles'

interface LikeButtonProps {
  isLiked: boolean
  handleClick: () => void
}

export function LikeButton({ isLiked, handleClick }: LikeButtonProps) {
  const [isLikeButtonHover, setIsLikeButtonHover] = useState(false)
  return (
    <LikeButtonContainer
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
      weight={isLiked ? 'fill' : isLikeButtonHover ? 'fill' : 'regular'}
      onClick={handleClick}
    />
  )
}
