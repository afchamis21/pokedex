import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  minHeight: '4rem',
  padding: '0.5rem 2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid',
  borderColor: '$gray700',
})

export const HeaderItems = styled('div', {
  maxWidth: '$maxW',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const Logo = styled('h1', {
  fontWeight: 'bold',
  fontSize: '$2xl',

  strong: {
    color: '$red500',
  },
})

export const LoginButton = styled('a', {
  padding: '0.5rem 1.5rem',
  fontWeight: 'bold',
  background: 'transparent',
  border: '2px solid $red500',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',

  '&:hover': {
    background: '$red500',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },

  '&:active': {
    filter: 'brightness(0.8)',
  },
})

export const NavContainer = styled('nav', {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',

  'a:first-child': {
    position: 'relative',

    '&:before': {
      content: '',
      position: 'absolute',
      width: ' 100%',
      height: '2px',
      background: '$red500',
      bottom: 0,
      left: 0,
      transformOrigin: 'right',
      transform: 'scaleX(0)',
      transition: 'transform .3s ease-in-out',
    },

    '&:hover:before': {
      transform: ' scaleX(1)',
      transformOrigin: 'left',
    },
  },
})
