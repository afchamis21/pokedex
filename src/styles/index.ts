import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray900: '#121214',
      gray800: '#181C1F',
      gray700: '#2D323A',
      gray600: '#2E2B39',
      gray300: '#A2A9B9',
      gray100: '#EAF2F7',

      red500: '#FF1D4B',
      red400: '#FF5678',
    },

    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
    sizes: {
      maxW: '1080px',
    },
  },
})
