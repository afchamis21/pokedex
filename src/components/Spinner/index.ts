import { keyframes, styled } from '../../styles'

const spin = keyframes({
  '0%': {
    transform: ' rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const Spinner = styled('div', {
  display: 'inline-block',
  width: '80px',
  height: '80px',

  '&:after': {
    content: ' ',
    display: 'block',
    width: '64px',
    height: '64px',
    margin: '8px',
    borderRadius: '50%',
    border: '6px solid $red500',
    borderColor: '$red500 transparent $red500 transparent',
    animation: `${spin} 1.2s linear infinite`,
  },
})
