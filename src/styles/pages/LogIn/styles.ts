import { styled } from '../..'

export const LoginContainer = styled('main', {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
})

export const LoginMenu = styled('div', {
  maxWidth: '30rem',
  width: '100%',

  background: '$gray800',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  padding: '1rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
})

export const LogInButton = styled('button', {
  color: '$gray100',
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  fontWeight: 'bold',
  background: 'transparent',
  border: '2px solid $red500',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '0.5rem',

  '&:hover': {
    background: '$red500',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },

  '&:active': {
    filter: 'brightness(0.8)',
  },
})
