'use client'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styles/theme'

type Props = {
  children: React.ReactNode
}

const CustomThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position='top-center' reverseOrder={false} />
      {children}
    </ThemeProvider>
  )
}
export default CustomThemeProvider
