'use client'

import { z } from 'zod'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Box, Typography, Button, useTheme, CircularProgress } from '@mui/material'

import { Input, SelectComponent } from '@/components'
import { addNewTask } from '@/app/api/tasks'
import { isAuth } from '@/utils/isAuth'

const CreateTaskSchema = z.object({
  priority: z.string().nonempty('Campo Obrigatório'),
  title: z.string().nonempty('Campo Obrigatório').max(20, 'Máximo de 20 caracteres'),
  description: z.string().nonempty('Campo Obrigatório').max(30, 'Máximo de 30 caracteres'),
})

export type CreateTaskFormData = z.infer<typeof CreateTaskSchema>

const requiredFields = [
  {
    id: 'title',
    label: 'Título',
  },
  {
    id: 'description',
    label: 'Descrição',
  },
]

const selectList = [
  {
    label: 'Baixa',
    value: 'baixa',
  },
  {
    label: 'Média',
    value: 'media',
  },
  {
    label: 'Alta',
    value: 'alta',
  },
]

const TaskForm = () => {
  const theme = useTheme()
  const [isPending, startTransition] = useTransition()
  // const userId = isAuth() as string

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(CreateTaskSchema),
  })

  const onSubmit = (data: CreateTaskFormData) => {
    // if (userId) { // uncomment this if you want to test protected route on create task.
    startTransition(async () => {
      try {
        // await addNewTask({ ...data, userId }) part of protected route as well
        await addNewTask(data)
        toast.success('Tarefa adicionada.')
        reset()
      } catch (error) {
        toast.error('Algo deu errado')
        console.error(error)
      }
    })
    // }
  }

  return (
    <Box
      sx={{
        mx: 'auto',
        borderRadius: '10px',
        boxShadow: theme.shadows[6],
        p: 2,
        maxWidth: '800px',
      }}
    >
      <Typography
        sx={{
          color: 'white',
          textAlign: 'center',
          fontSize: '1.2rem',
          textDecoration: 'underline',
        }}
      >
        Adicione uma nova Tarefa
      </Typography>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component='form'
        sx={{
          gap: 2,
          p: 4,
          mt: 5,
          bgcolor: theme.colors.secondary,
          border: '1px solid black',
          borderRadius: '10px',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {requiredFields.map((requiredField) => (
          <Controller
            key={requiredField.label}
            name={requiredField.id as keyof CreateTaskFormData}
            control={control}
            render={({ field }) => (
              <Input
                sx={{
                  width: '160px',
                }}
                label={requiredField.label}
                id={requiredField.id}
                register={register}
                errors={errors}
                disabled={isPending}
                {...field}
              />
            )}
          />
        ))}
        <SelectComponent
          id='priority'
          errors={errors}
          register={register}
          disabled={isPending}
          selectList={selectList}
          label='Prioridade'
        />
        <Button
          variant='action'
          disabled={isPending}
          type='submit'
          sx={{ mb: 'auto', height: '40px', width: '113px' }}
        >
          {isPending ? (
            <CircularProgress sx={{ color: theme.colors.text }} size={30} />
          ) : (
            'Adicionar'
          )}
        </Button>
      </Box>
    </Box>
  )
}
export default TaskForm
