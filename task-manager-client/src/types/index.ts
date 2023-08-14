import { CreateTaskFormData } from '@/components/Task/TaskForm'

export type Priority = 'baixa' | 'media' | 'alta'
export type Status = 'pendente' | 'concluida'

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
}

export interface TaskResponse {
  currentPage: number
  totalPages: number
  tasks: Task[]
}

export interface CreateNewTask extends CreateTaskFormData {
  userId: string
}
