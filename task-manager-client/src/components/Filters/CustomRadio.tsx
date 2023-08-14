'use client'

import { RadioGroup, FormControl, FormControlLabel, Typography, useTheme } from '@mui/material'
import StyledRadioButton from './StyledRadioButton'

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
  value: string
  items: { label: string; value: string }[]
  defaultValue: string
  title?: string
  labelFontSize?: string
}

const CustumRadio = ({
  handleChange,
  items,
  value,
  defaultValue,
  title,
  labelFontSize = '1rem',
}: Props) => {
  const theme = useTheme()

  return (
    <FormControl>
      {title && <Typography sx={{ color: theme.colors.text }}>{title}:</Typography>}

      <RadioGroup row defaultValue={defaultValue} value={value} onChange={handleChange}>
        {items?.map((item) => (
          <FormControlLabel
            key={item.value}
            control={<StyledRadioButton />}
            label={item.label}
            value={item.value}
            sx={{
              color: theme.colors.text,
              '& .MuiFormControlLabel-label': { fontSize: labelFontSize },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default CustumRadio
