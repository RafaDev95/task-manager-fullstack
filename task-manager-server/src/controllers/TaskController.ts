import { Request, Response, Router } from 'express'

import { Controller } from '@/types'
import { db } from '@/config/firebase'
import { zodValidationMiddleware } from '@/validation/zodMiddleware'
// import authMiddleware from '@/validation/authMiddleware'
import { UpdateTaskSchema, CreateTaskSchema } from '@/models/schemas'

class TaskController implements Controller {
  public path = '/tasks'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.getTasks)
    this.router.get(`${this.path}/:id`, this.getTaskById)
    this.router.delete(`${this.path}/:id`, this.deleteTask)
    this.router.put(`${this.path}/:id`, this.completeTask)
    this.router.post(
      `${this.path}/create`,
      zodValidationMiddleware(CreateTaskSchema),
      this.createTask
    )
    // this.router.post(
    //   `${this.path}/create`,
    //   authMiddleware,
    //   zodValidationMiddleware(CreateTaskSchema),
    //   this.createTask
    // ) uncomment this to try a protected route on create task

    this.router.patch(
      `${this.path}/update`,
      zodValidationMiddleware(UpdateTaskSchema),
      this.updateTask
    )
  }

  async createTask(req: Request, res: Response) {
    const taskData = CreateTaskSchema.parse(req.body)

    const sanitizedTitle = taskData.title.toLowerCase().replace(/[^a-z0-9 ]/g, '')

    try {
      const newTaskData = { ...taskData, normalizedTitle: sanitizedTitle }
      const newTask = await db.collection('tasks').add(newTaskData)
      const newTaskSnapshot = await newTask.get()
      const newTaskResponse = { id: newTaskSnapshot.id, ...newTaskSnapshot.data() }

      res.json(newTaskResponse)
    } catch (error) {
      console.error('Error creating task:', error), res.status(500).json(error)
      res.status(500).json({ error: 'Error creating task' })
    }
  }

  async getTasks(req: Request, res: Response) {
    try {
      const tasksRef = db.collection('tasks')

      const { status, priority, title, page, limit } = req.query
      const pageNumber = parseInt(page as string, 10) || 1
      const itemsPerPage = parseInt(limit as string, 10) || 5

      let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = tasksRef

      if (status) {
        query = query.where('status', '==', status)
      }
      if (priority) {
        query = query.where('priority', '==', priority)
      }
      if (title) {
        query = query
          .where('normalizedTitle', '>=', title)
          .where('normalizedTitle', '<=', title + '\uf8ff')
      }

      const totalTasks = await query.get()
      const totalItems = totalTasks.size
      const totalPages = Math.ceil(totalItems / itemsPerPage)

      const offset = (pageNumber - 1) * itemsPerPage

      query = query.orderBy('normalizedTitle').offset(offset).limit(itemsPerPage)

      const response = await query.get()

      const parsedResponse: any[] = []
      response.forEach((doc) => {
        const data = doc.data()
        parsedResponse.push({ id: doc.id, ...data })
      })

      res.json({
        currentPage: pageNumber,
        totalPages: totalPages,
        tasks: parsedResponse,
      })
    } catch (error) {
      console.error('Error fetching tasks:', error)
      res.status(500).json({ error: 'Error fetching tasks' })
    }
  }

  async getTaskById(req: Request, res: Response) {
    const taskId = req.params.id

    try {
      if (!taskId) {
        return res.status(400).json({ error: 'Task ID is missing' })
      }
      const taskRef = db.collection('tasks').doc(req.params.id)
      const response = await taskRef.get()

      if (!response.exists) {
        return res.status(404).json({ error: 'Task not found' })
      }

      const data = response.data()

      res.json({ id: response.id, ...data })
    } catch (error) {
      console.error('Error fetching task:', error), res.status(500).json(error)
      res.status(500).json({ error: 'Error fetching tasks' })
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { fieldToUpdate, id, value } = UpdateTaskSchema.parse(req.body)

      const updateObject: Record<string, string> = {}
      updateObject[fieldToUpdate] = value
      const taskRef = await db.collection('tasks').doc(id).update(updateObject)

      res.json(taskRef)
    } catch (error: any) {
      console.error('Error updating task:', error)
      res.status(500).json({ error: 'Someting went wrong' })
    }
  }

  async completeTask(req: Request, res: Response) {
    const taskId = req.params.id
    const tasksRef = db.collection('tasks')
    try {
      await tasksRef.doc(taskId).update({
        status: 'concluida',
      })

      res.json({ message: 'Completed' })
    } catch (error: any) {
      console.error('Error updating task:', error)
      res.status(500).json({ error: 'Someting went wrong' })
    }
  }

  async deleteTask(req: Request, res: Response) {
    const taskId = req.params.id

    try {
      if (!taskId) {
        return res.status(400).json({ error: 'Task ID is missing' })
      }
      const taskRef = db.collection('tasks').doc(req.params.id)
      await taskRef.delete()

      res.json({ message: 'Deleted' })
    } catch (error) {
      console.error('Error fetching task:', error), res.status(500).json(error)
      res.status(500).json({ error: 'Error fetching tasks' })
    }
  }
}

const makeTaskController = new TaskController()

export default makeTaskController
