import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      primary: string
      secondary: string
      accent: string
      text: string
      background: string
      warning: string
      error: string
      foreground: string
    }
  }
  interface ThemeOptions {
    colors: {
      primary: string
      secondary: string
      accent: string
      text: string
      background: string
      warning: string
      error: string
      foreground: string
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true
    secondary: true
    ghost: true
    error: true
    warning: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sectionTitle: true
  }
}
