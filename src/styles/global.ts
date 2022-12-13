import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    background: '$gray900',
    color: '$gray100',
  },

  'body, input, textarea, button': {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
  },

  a: {
    all: 'unset',
    cursor: 'pointer',
  },

  '::-webkit-scrollbar': {
    width: '10px',
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    background: '$gray900',
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: '$gray600',
    borderRadius: '10px',
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: '$red400',
  },
})
