import { styled } from '../../styles'

export const PageControllerContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  'button:first-child, button:last-child': {
    lineHeight: 0,
    background: 'transparent',
    border: 0,
    color: '$gray100',
  },

  'button:not(:disabled):hover svg': {
    color: '$red500',
    transition: 'color 0.1s',
    cursor: 'pointer',
  },

  'button:disabled svg': {
    cursor: 'not-allowed',
    filter: 'opacity(0.6)',
  },
})

export const PageIndicator = styled('button', {
  border: '1px solid $red500',
  borderRadius: '4px',
  fontWeight: 'bold',
  color: '$gray100',
  width: '2.5rem',
  height: '2.5rem',

  '&:not(:disabled):hover': {
    cursor: 'pointer',
    background: '$red400',
    borderColor: 'transparent',
    transition: 'all 0.2s',
  },

  variants: {
    active: {
      true: {
        background: '$red500',
      },
      false: {
        background: 'transparent',
      },
    },
  },
})
