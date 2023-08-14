'use client'

import { TextField, useTheme } from '@mui/material'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

type Props = {
  id: string
  label: string
  type?: string
  disabled?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
  fullWidth?: boolean
  sx?: { [key: string]: any }
  isDateFormat?: boolean
  maxLength?: number
}

const Input = ({
  errors,
  id,
  label,
  register,
  disabled,
  type,
  fullWidth = false,
  sx,
  maxLength,
}: Props) => {
  const theme = useTheme()
  return (
    <TextField
      label={label}
      {...register(id)}
      error={!!errors[id]}
      helperText={errors[id] ? errors[id]?.message?.toString() : null}
      type={type ?? 'text'}
      fullWidth={fullWidth}
      sx={{
        input: { color: theme.colors.text },
        '&>label': { color: theme.colors.text },
        '& label.Mui-focused': {
          color: theme.colors.text,
        },

        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#E0E3E7',
          },
          '&:hover fieldset': {
            borderColor: '#B2BAC2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
          },
        },
        ...sx,
      }}
      disabled={disabled}
      size='small'
      autoComplete='off'
      inputProps={{ maxLength }}
    />
  )
}
export default Input
