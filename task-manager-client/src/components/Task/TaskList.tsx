'use client'

import { Box, useTheme, Typography, List } from '@mui/material'
import TaskCard from './TaskCard'
import { Task } from '@/types'
import CustomRadio from '../Filters/CustomRadio'
import { useState } from 'react'

type Props = {
  isTaskPending: boolean
  tasks: Task[]
}

const prioritiesFilter = [
  {
    value: 'todas',
    label: 'Todas',
  },
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

const TaskList = ({ isTaskPending, tasks }: Props) => {
  const theme = useTheme()
  const [priority, setPriority] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority((event.target as HTMLInputElement).value)
  }

  const tasksForMapping = priority
    ? tasks.filter((task) => {
        if (priority === 'todas') {
          return task
        } else {
          return task.priority === priority
        }
      })
    : tasks

  return (
    <Box
      sx={{
        bgcolor: theme.colors.secondary,
        border: '1px solid black',
        borderRadius: '10px',
        px: { sm: 4, xs: 1 },
        minHeight: '550px',
      }}
    >
      <Typography
        sx={{
          color: 'white',
          borderRadius: '0 0 10px 10px',
          textAlign: 'center',
          px: 2,
          boxShadow: theme.shadows[2],
          bgcolor: isTaskPending ? theme.colors.warning : theme.colors.primary,
        }}
      >
        {isTaskPending ? 'Pendentes' : 'Concluídas'}
      </Typography>
      <List
        sx={{
          borderRadius: '10px',
          px: { md: 2, xs: 0 },
          mt: 5,
          height: '650px',
        }}
      >
        <CustomRadio
          handleChange={handleChange}
          value={priority}
          items={prioritiesFilter}
          defaultValue='Todas'
          title='Prioridade'
        />

        {tasksForMapping?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </List>
    </Box>
  )
}
export default TaskList
