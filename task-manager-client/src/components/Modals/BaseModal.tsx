'use client'

import { Modal, Box, Typography, IconButton, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  title: string
  isOpen: boolean
  onClose: () => void
  bodyContent: React.ReactNode
}

const BaseModal = ({ title, isOpen, onClose, bodyContent }: Props) => {
  const theme = useTheme()
  return (
    <Box>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            borderRadius: '.5rem',
            p: 4,
            width: '100%',
            maxWidth: 700,
            bgcolor: theme.colors.secondary,
          }}
        >
          <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
            <Typography
              sx={{ color: theme.colors.text, textDecoration: 'underline', fontSize: '1.5rem' }}
            >
              {title}
            </Typography>
            <IconButton
              sx={{
                color: theme.colors.text,
                '&:hover': {
                  '&>svg': {
                    transform: 'scale(1.2)',
                  },
                },
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {bodyContent}
        </Box>
      </Modal>
    </Box>
  )
}

export default BaseModal
