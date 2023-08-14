import { z } from 'zod'

export const UpdateTaskSchema = z.object({
  id: z.string(),
  fieldToUpdate: z.string(),
  value: z.string(),
})

export const CreateTaskSchema = z.object({
  // userId: z.string().nonempty('Required field'), if you need protected routes
  status: z.enum(['concluida', 'pendente']).default('pendente').nullable(),
  priority: z.enum(['baixa', 'media', 'alta']),
  title: z.string().nonempty('Required field').max(20, 'Max 20 caracters'),
  description: z.string().nonempty('Required field').max(30, 'Max 30 caracters'),
})

export const CreateUserSchema = z.object({
  email: z.string().nonempty('Required field').email('Invalid email'),
  password: z.string().nonempty('Required field'),
  name: z.string().nonempty('Required field'),
})
