import { Heart } from 'phosphor-react'
import { styled } from '../../styles'

export const LikeButtonContainer = styled(Heart, {
  width: '30px',
  height: '30px',
  lineHeight: 0,
  padding: 0,
  color: '$red500',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',
})
