'use client'

import { Container, Box, useTheme } from '@mui/material'

import { TaskForm, Navbar, TaskList, SearchBar, PaginationComponent } from './'
import { TaskResponse } from '@/types'

type Props = {
  tasksData: TaskResponse
}

const HeroSection = ({ tasksData }: Props) => {
  const theme = useTheme()

  const tasks = tasksData?.tasks
  const pendingTasks = tasks?.filter((task) => task.status === 'pendente')
  const completedTasks = tasks?.filter((task) => task.status === 'concluida')

  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: '100vh',
        pb: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: theme.colors.background,
          boxShadow: theme.shadows[3],
          height: '100%',
          minHeight: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          pb: 4,
        }}
      >
        <Navbar />

        <TaskForm />
        <SearchBar sx={{ mx: 'auto', mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-around',
            gap: 2,
            px: 2,
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <TaskList isTaskPending tasks={pendingTasks!} />
          <TaskList isTaskPending={false} tasks={completedTasks!} />
        </Box>
        <PaginationComponent
          totalPages={tasksData.totalPages}
          sx={{
            mx: 'auto',
          }}
        />
      </Box>
    </Container>
  )
}
export default HeroSection
