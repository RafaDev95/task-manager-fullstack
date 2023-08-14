import { createTheme } from '@mui/material/styles'
import { Josefin_Sans } from 'next/font/google'
import { yellow, red } from '@mui/material/colors'

const josefin_Sans = Josefin_Sans({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const createHoverEffectStyles = (color: string) => ({
  '&:hover': {
    backgroundColor: color,
    boxShadow: `0px 2px 6px 0px ${color}`,
  },
})

const colors = {
  text: '#fafafa',
  background: '#1b1924',
  primary: '#3e24a8',
  secondary: '#171723',
  accent: '#776f9b',
  warning: 'darkOrange',
  error: red[800],
  foreground: '#1f253b',
}

const theme = createTheme({
  colors,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'action' },
          style: {
            backgroundColor: colors.primary,
            color: colors.text,
            ...createHoverEffectStyles('rgba(62, 36, 168,0.9)'),
            '&:disabled': {
              opacity: 0.6,
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: colors.accent,
            color: colors.text,
            ...createHoverEffectStyles('rgba(13, 13, 12,0.8)'),
          },
        },
        {
          props: { variant: 'ghost' },
          style: {
            border: `1px solid ${colors.primary}`,
            color: colors.text,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
        {
          props: { variant: 'error' },
          style: {
            backgroundColor: red[800],

            color: 'white',
            ...createHoverEffectStyles(red[600]),
          },
        },
        {
          props: { variant: 'warning' },
          style: {
            backgroundColor: yellow[800],

            ...createHoverEffectStyles(yellow[600]),
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: josefin_Sans.style.fontFamily,
  },
})

export default theme
