'use client'
import { useState } from 'react'

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconProps,
  useTheme,
  CircularProgress,
} from '@mui/material'

type Props = {
  icon?: React.ReactElement<IconProps>
  confirmationTitle: string
  label?: string
  handleConfirmation: () => void
  disabled?: boolean
}

const ActionConfirmation = ({
  icon,
  confirmationTitle,
  label,
  handleConfirmation,
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false)

  const theme = useTheme()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {icon ? (
        <IconButton
          onClick={handleClickOpen}
          sx={{ '&:hover': { bgcolor: theme.colors.secondary } }}
        >
          {icon}
        </IconButton>
      ) : (
        <Button variant='outlined' onClick={handleClickOpen}>
          {label}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { background: theme.colors.secondary } }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 'normal' }}>{confirmationTitle}</DialogTitle>
        <DialogActions>
          <Button variant='action' onClick={handleConfirmation} autoFocus disabled={disabled}>
            {disabled ? <CircularProgress sx={{ color: theme.colors.text }} size={25} /> : 'Sim'}
          </Button>
          <Button variant='error' onClick={handleClose} disabled={disabled}>
            {disabled ? <CircularProgress sx={{ color: theme.colors.text }} size={25} /> : 'Não'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ActionConfirmation
