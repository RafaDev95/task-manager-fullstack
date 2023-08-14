'use client'

import debounce from 'lodash/debounce'
import { keyframes } from '@emotion/react'
import toast from 'react-hot-toast'

import { Box, Stack, TextField, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

import { Task } from '@/types'
import { filteredSearchTasks } from '@/app/api/tasks'
import TaskCard from '../Task/TaskCard'

import CustomCheckbox from './CustomCheckbox'

const slideIn = keyframes`
from {
  opacity:0;
  transform: translateY(-5%);
}
to {
  opacity:1;
  transform: translateY(0);
}
`

type Props = {
  sx?: Record<string, string | number>
}

const prioritiesFilter = [
  {
    value: 'baixa',
    label: 'Baixa',
  },
  {
    value: 'media',
    label: 'Média',
  },
  {
    value: 'alta',
    label: 'Alta',
  },
]

const statusFilter = [
  {
    value: 'pendente',
    label: 'Pendente',
  },
  {
    value: 'concluida',
    label: 'Concluída',
  },
]

const SearchBar = ({ sx }: Props) => {
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [priorityFilterValue, setPriorityFilterValue] = useState('')
  const [statusFilterValue, setStatusFilterValue] = useState('')
  const [suggestions, setSuggestions] = useState<Task[]>([])
  const [showModal, setShowModal] = useState(false)

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setPriorityFilterValue((prevValue) => (prevValue === newValue ? '' : newValue))
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    setStatusFilterValue((prevValue) => (prevValue === newValue ? '' : newValue))
  }

  const handleSearch = debounce(async (title: string, priority?: string, status?: string) => {
    if (title.length === 3) {
      const data = await filteredSearchTasks(title, priority, status)
      if (data.tasks.length >= 1) {
        setSuggestions(data.tasks)
        setShowModal(true)
        return
      } else {
        toast.error('Sem resultado')
      }
    } else if (title.length < 3) {
      setShowModal(false)
    }
  }, 500)

  useEffect(() => {
    handleSearch(title, priorityFilterValue, statusFilterValue)
  }, [title, priorityFilterValue, statusFilterValue])

  return (
    <Box sx={{ ...sx, position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CustomCheckbox
          handleChange={handlePriorityChange}
          value={priorityFilterValue}
          items={prioritiesFilter}
        />
        <TextField
          placeholder='Pesquise pelo título'
          size='small'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            background: 'white',
            borderRadius: '.5rem',
            width: { sm: 350, xs: 250 },
            '& .MuiOutlinedInput-root': {
              paddingRight: '0',
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
        <CustomCheckbox
          handleChange={handleStatusChange}
          value={statusFilterValue}
          items={statusFilter}
        />
      </Box>
      <Stack
        sx={{
          position: 'absolute',
          top: 90,
          right: 0,
          zIndex: showModal ? 10 : -10,
          bgcolor: theme.colors.secondary,
          border: '1px solid black',
          boxShadow: theme.shadows[3],
          width: { sm: 350, xs: 250 },
          borderRadius: '.5rem',
          gap: 1,
          p: 1,
          opacity: showModal ? 1 : 0,
          animation: showModal ? `${slideIn} 0.5s ease-in-out` : ``,
        }}
      >
        {suggestions.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </Stack>
    </Box>
  )
}

export default SearchBar
