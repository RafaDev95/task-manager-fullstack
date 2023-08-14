import { Select, Box, InputLabel, MenuItem, FormControl, useTheme, Typography } from '@mui/material'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

type Props = {
  selectList: { label: string; value: string }[]
  label: string
  id: string
  disabled?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
}

const SelectComponent = ({ selectList, label, errors, id, register, disabled }: Props) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        minWidth: 120,
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.colors.text,
          color: 'white',
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
      }}
    >
      <FormControl fullWidth error={!!errors[id]}>
        <InputLabel sx={{ color: 'white' }}>{label}</InputLabel>
        <Select
          disabled={disabled}
          label={label}
          size='small'
          {...register(id)}
          error={!!errors[id]}
          sx={{
            color: 'white',
            '.MuiSvgIcon-root': {
              fill: 'white !important',
            },
          }}
          defaultValue='baixa'
        >
          {selectList?.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>

        {errors[id] ? (
          <Typography
            sx={{
              color: '#d32f2f',
              fontWeight: 400,
              fontSize: '0.75rem',
              lineHeight: '1.66',
              mt: '4px',
              mx: '14px',
            }}
            component='p'
          >
            {errors[id]?.message?.toString()}
          </Typography>
        ) : null}
      </FormControl>
    </Box>
  )
}

export default SelectComponent
