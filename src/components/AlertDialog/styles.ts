import { styled } from '../../styles'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

export const Overlay = styled(AlertDialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(AlertDialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',

  padding: '1rem 2rem',
  background: '$gray800',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '3rem',
})

export const ButtonsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
})

export const Cancel = styled(AlertDialog.Cancel, {
  padding: '0.5rem 1rem',
  background: '#ffe5e5',
  color: '$red500',
  borderRadius: '6px',
  border: 0,

  '&:hover': {
    cursor: 'pointer',
    filter: 'brightness(0.8)',
    transition: 'filter 0.2s',
  },
})

export const Action = styled(AlertDialog.Action, {
  padding: '0.5rem 1rem',
  background: 'transparent',
  color: '$gray100',
  borderRadius: '6px',
  border: '2px solid #63c174',

  '&:hover': {
    cursor: 'pointer',
    background: '$gray100',
    color: '$gray900',
    border: '2px solid $gray100',
    transition: 'all 0.2s',
  },

  '&:focus': {
    outline: '1px solid #fff',
    border: '2px solid #000',
  },
})
