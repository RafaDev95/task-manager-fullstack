'use client'

import { Typography } from '@mui/material'

type Props = {
  color: string
  bgcolor: string
  label: string
  fontSize?: string
  top?: number
  bottom?: number
  left?: number
  right?: number
}

const TaskBadge = ({
  bgcolor,
  color,
  label,
  fontSize = '12px',
  top,
  bottom,
  left,
  right,
}: Props) => {
  return (
    <Typography
      sx={{
        position: 'absolute',
        bottom,
        right,
        top,
        left,
        fontSize,
        bgcolor,
        borderRadius: '5px',
        color,
        p: 0.2,
      }}
    >
      {label}
    </Typography>
  )
}
export default TaskBadge
