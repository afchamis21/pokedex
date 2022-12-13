import { styled } from '../../styles'

export const FormContainer = styled('form', {
  maxWidth: '26rem',
  width: '100%',
  display: 'flex',
  gap: '1rem',
})

export const SearchInput = styled('input', {
  all: 'unset',
  flex: 1,
  padding: '1rem',
  borderRadius: '6px',
  border: 'none',
  background: '$gray700',
  color: '$gray100',

  '&:focus': {
    outline: '2px solid $red400',
  },
})

export const SearchButton = styled('button', {
  padding: '0.5rem',
  lineHeight: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '$gray100',
  background: 'transparent',
  border: '2px solid $red500',
  borderRadius: '6px',

  '&:not(:disabled):hover': {
    background: '$red500',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },

  '&:active, &:disabled': {
    filter: 'brightness(0.8)',
  },
})
