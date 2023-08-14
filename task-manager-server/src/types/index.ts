import { Router } from 'express'

export interface Controller {
  path: string
  router: Router
}

export interface Task {
  name: string
  priority: 'baixa' | 'media' | 'alta'
}
