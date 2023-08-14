'use client'

import { Box, Toolbar, AppBar, Typography, Container, useTheme, Button } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'

import useRegisterModalStore from '@/shared/hooks/useAuthModalStore'
import { isAuth } from '@/utils/isAuth'
import { deleteCookie } from 'cookies-next'

const Navbar = () => {
  const theme = useTheme()
  const router = useRouter()

  const userId = isAuth()

  const { onOpen } = useRegisterModalStore()

  const handleLogout = () => {
    deleteCookie('userId')
    deleteCookie('token')
    router.refresh()
  }

  return (
    <AppBar
      sx={{ position: 'relative', bgcolor: theme.colors.secondary, boxShadow: theme.shadows[1] }}
    >
      <Container>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
          <Typography
            sx={{ color: theme.colors.text, fontWeight: 600, textDecoration: 'none' }}
            component={NextLink}
            href='/'
          >
            Task Manager
          </Typography>

          {userId ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: theme.colors.text, cursor: 'pointer' }}>
                Bem vindo.
              </Typography>
              <Button variant='action' onClick={handleLogout}>
                Sair
              </Button>
            </Box>
          ) : (
            <>
              <Button variant='action' onClick={() => onOpen()}>
                Entrar
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
