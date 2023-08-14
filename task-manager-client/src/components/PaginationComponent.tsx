'use client'

import { Pagination, PaginationItem, Stack, useTheme } from '@mui/material'
import NextLink from 'next/link'

type Props = {
  sx: { [key: string]: string | number }
  totalPages: number
}

const PaginationComponent = ({ sx, totalPages = 2 }: Props) => {
  const theme = useTheme()

  return (
    <Stack
      spacing={2}
      sx={{
        bgcolor: theme.colors.text,
        p: 2,
        borderRadius: '10px',

        ...sx,
      }}
    >
      <Pagination
        count={totalPages}
        variant='outlined'
        shape='rounded'
        renderItem={(item) => (
          <PaginationItem
            component={NextLink}
            href={`?page=${item.page}`}
            scroll={false}
            {...item}
          />
        )}
      />
    </Stack>
  )
}
export default PaginationComponent
