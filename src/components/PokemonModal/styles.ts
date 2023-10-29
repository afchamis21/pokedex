import { styled } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',

  padding: '2rem 4rem',
  background: '$gray800',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '3rem',
})

export const Close = styled(Dialog.Close, {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'transparent',
  border: 0,
  color: '$gray100',
  transition: 'color 0.2s',
  cursor: 'pointer',

  '&:hover': {
    color: '$red500',
  },
})

export const InformationContainer = styled('div', {
  display: 'flex',
  gap: '4rem',
})

export const ImageContainer = styled('div', {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',

  button: {
    background: 'transparent',
    border: 0,
    color: '$gray100',
    transition: 'color 0.2s',
    cursor: 'pointer',

    '&:not(:disabled):hover': {
      color: '$red500',
    },

    '&:disabled': {
      opacity: '0.7',
      cursor: 'not-allowed',
    },
  },
})

export const Summary = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const Information = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  ul: {
    listStyle: 'none',
    li: {
      textIndent: '1rem',
    },
  },
})
