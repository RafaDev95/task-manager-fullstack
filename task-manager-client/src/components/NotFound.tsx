'use client'

import Image from 'next/image'
import NextLink from 'next/link'

import { Container, Typography, useTheme, Box } from '@mui/material'

const NotFound = () => {
  const theme = useTheme()
  return (
    <Container maxWidth='lg' sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          height: '900px',
          bgcolor: theme.colors.secondary,
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
          p: 6,
        }}
      >
        <Typography sx={{ fontSize: { sm: '4rem', xs: '2rem' }, color: theme.colors.text }}>
          Não encontrado.
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            height: '100%',
            [theme.breakpoints.down('sm')]: { width: '250px', height: '300px' },
          }}
        >
          <Image src='/not-found.svg' fill style={{ objectFit: 'contain' }} alt='404' />
        </Box>
        <Box sx={{ color: theme.colors.text }}>
          <Typography sx={{ fontSize: { sm: '1.5rem', xs: '1rem' } }}>
            Desculpe mas, creio que tenha ocorrido algum erro. <br />
            Por favor, volte à{' '}
            <Typography
              component={NextLink}
              href='/'
              sx={{ fontSize: { sm: '1.5rem', xs: '1rem' }, color: theme.colors.accent }}
            >
              página inicial
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
export default NotFound
