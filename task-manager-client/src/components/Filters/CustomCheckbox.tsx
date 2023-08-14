'use client'

import { FormGroup, FormControlLabel, Checkbox, useTheme } from '@mui/material'

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  items: { label: string; value: string }[]
  value: string
}

const CustomCheckbox = ({ handleChange, items, value }: Props) => {
  const theme = useTheme()
  return (
    <FormGroup row>
      {items?.map((item) => (
        <FormControlLabel
          key={item.value}
          label={item.label}
          control={
            <Checkbox
              checked={item.value === value}
              onChange={handleChange}
              value={item.value}
              sx={{
                color: theme.colors.text,
                '&.Mui-checked': {
                  // Styling for checked state
                  color: theme.colors.text, // Change text color
                },
              }}
            />
          }
          sx={{
            color: 'white',
            '& .MuiFormControlLabel-label': { fontSize: '14px' },
          }}
        />
      ))}
    </FormGroup>
  )
}
export default CustomCheckbox
