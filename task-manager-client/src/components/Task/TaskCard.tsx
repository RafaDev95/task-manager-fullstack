'use client'

import toast from 'react-hot-toast'
import { useTransition } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import { Box, useTheme, Typography, ListItem, Stack, IconButton } from '@mui/material'

import { Status, Task } from '@/types'
import ActionConfirmation from '../ActionConfirmation'
import TaskBadge from './TaskBadge'
import { completeTask, removeTask } from '@/app/api/tasks'

type Props = {
  task: Task
}

const TaskCard = ({ task }: Props) => {
  const theme = useTheme()
  const [isPending, startTransition] = useTransition()

  const isTaskStatusPending = task.status === 'pendente'

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeTask(task.id)

        toast.success('Tarefa removida')
      } catch (error) {
        console.log(error)
        toast.error('Algo deu errado.')
      }
    })
  }

  const handleCompleteTask = (status: Status) => {
    if (status === 'pendente') {
      startTransition(async () => {
        try {
          await completeTask(task.id)

          toast.success('Tarefa concluída.')
        } catch (error) {
          console.log(error)
          toast.error('Algo deu errado.')
        }
      })
    } else {
      return null
    }
  }

  const handlePriorityBadgeColors = (priority: 'baixa' | 'media' | 'alta') => {
    switch (priority) {
      case 'baixa':
        return theme.palette.success.main
      case 'media':
        return theme.colors.warning

      case 'alta':
        return theme.colors.error

      default:
        break
    }
  }

  return (
    <ListItem
      sx={{
        position: 'relative',
        mt: 1,
        bgcolor: theme.colors.background,
        boxShadow: theme.shadows[3],
        color: 'white',
        borderRadius: '10px',
        borderLeft: `3px solid ${
          task.status === 'pendente' ? theme.colors.warning : theme.colors.primary
        }`,
        transition: 'all .4s',
        cursor: 'pointer',
        minHeight: '100px',
        '&:hover': {
          bgcolor: theme.colors.foreground,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Box sx={{ width: { sm: '100%', xs: '100px' } }}>
        <Typography>{task.title}</Typography>
        <Typography
          title={task.description}
          sx={{
            fontSize: '12px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {task.description}
        </Typography>
      </Box>

      <Stack direction='row'>
        <ActionConfirmation
          disabled={isPending}
          handleConfirmation={handleDelete}
          icon={<DeleteIcon sx={{ color: theme.colors.text }} />}
          confirmationTitle='Deseja excluir essa tarefa?'
        />
        <IconButton
          sx={{
            '&:hover': { bgcolor: isTaskStatusPending ? theme.colors.secondary : 'transparent' },
          }}
          onClick={() => handleCompleteTask(task.status)}
          disabled={isTaskStatusPending ? isPending : true}
        >
          {isTaskStatusPending ? (
            <BookmarkBorderIcon sx={{ color: theme.colors.text }} />
          ) : (
            <BookmarkAddedIcon sx={{ color: theme.colors.accent }} />
          )}
        </IconButton>
      </Stack>

      <TaskBadge
        label={task.status}
        bgcolor={isTaskStatusPending ? theme.colors.warning : theme.colors.primary}
        color='white'
        top={3}
        right={3}
      />
      <TaskBadge
        label={task.priority}
        bgcolor={handlePriorityBadgeColors(task.priority) as string}
        bottom={3}
        right={3}
        color='white'
      />
    </ListItem>
  )
}
export default TaskCard
