import { styled } from '../../styles'

export const PokemonCardContainer = styled('div', {
  width: '20rem',
  padding: '1rem',
  background: '$gray800',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',

  svg: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
})

export const TypeList = styled('ul', {
  listStyle: 'none',
  display: 'flex',
  gap: '1rem',
  maxWidth: '150',
  flexWrap: 'wrap',

  marginTop: '0.5rem',
  li: {
    background: '$gray600',
    borderRadius: '6px',
    padding: '0.2rem 0.4rem',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
})
