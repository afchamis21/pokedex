import { styled } from '../../styles'

export const UserListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  p: {
    textAlign: 'center',
  },
})

export const UserListTitle = styled('h3', {
  paddingBottom: '0.2rem',
  borderBottom: '2px solid $red500',
})

export const PaginationButtonsContainer = styled('div', {
  alignSelf: 'flex-end',
  display: 'flex',
  gap: '0.5rem',
})

export const PaginationButton = styled('button', {
  padding: '0.5rem',
  color: '$gray100',
  background: '$gray800',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  border: 0,
  cursor: 'pointer',
  borderRadius: '4px',
  lineHeight: 0,

  '&:disabled': {
    cursor: 'not-allowed',
    filter: 'opacity(0.5)',
  },

  '&:not(:disabled):hover': {
    filter: 'brightness(1.3)',
  },
})

export const SpinnerContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
})
