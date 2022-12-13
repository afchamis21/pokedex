import { styled } from '../../styles'

export const GridContainer = styled('div', {
  display: 'flex',
  flex: 1,
  maxWidth: '$maxW',
  margin: '2rem auto',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'flex-start',

  flexWrap: 'wrap',
})
