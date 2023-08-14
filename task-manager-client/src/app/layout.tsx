import CustomThemeProvider from '@/providers/CustomThemeProvider'
import ModalsProvider from '@/providers/ModalsProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'

const font = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Task Manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='/icons/task-icon.png' />
      </head>
      <body className={font.className}>
        <CustomThemeProvider>
          <ModalsProvider />

          {children}
        </CustomThemeProvider>
      </body>
    </html>
  )
}
