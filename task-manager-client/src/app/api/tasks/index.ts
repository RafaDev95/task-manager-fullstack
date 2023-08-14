'use server'

import { CreateTaskFormData } from '@/components/Task/TaskForm'
import { TaskResponse } from '@/types'
import api from '@/utils/api'
import { revalidatePath } from 'next/cache'

export const getTasks = async (page: number = 1, limit: number = 5): Promise<TaskResponse> => {
  const response = await api.get('/tasks', {
    params: {
      page: page,
      limit: limit,
    },
  })

  return response.data
}

export const addNewTask = async (taskData: CreateTaskFormData) => {
  // if you want to test protected route, uncomment the import of CreateNewTask and use it as a type of taskData instead of CreatTaskFormData
  await api.post('/tasks/create', taskData)

  revalidatePath('/')
}

export const completeTask = async (taskId: string) => {
  await api.put(`/tasks/${taskId}`)

  revalidatePath('/')
}

export const removeTask = async (taskId: string) => {
  await api.delete(`/tasks/${taskId}`)

  revalidatePath('/')
}

export const filteredSearchTasks = async (
  title: string,
  priority?: string,
  status?: string
): Promise<TaskResponse> => {
  let url = `/tasks?title=${title.toLowerCase()}`

  if (priority) {
    url += `&priority=${priority}`
  }

  if (status) {
    url += `&status=${status}`
  }

  const response = await api.get(url)

  return response.data
}
