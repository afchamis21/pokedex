import { styled } from '../../styles'

export const UserCardContainer = styled('div', {
  background: '$gray800',
  width: '15rem',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

  img: {
    borderRadius: '6px',
  },
})

export const Links = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  lineHeight: 0,
})

export const UserInfoContainer = styled('div', {
  height: '4rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',

  button: {
    border: 0,
    lineHeight: 0,
    background: 'transparent',
    color: '$gray100',

    cursor: 'pointer',

    '&:not(:disabled):hover': {
      filter: 'brightness(0.8)',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})
