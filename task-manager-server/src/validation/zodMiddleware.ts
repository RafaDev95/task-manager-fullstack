import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export const zodValidationMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorsFields = error.issues

        const parsedErrors = errorsFields.map((error) => {
          return { field: error.path[0], message: error.message }
        })

        res.status(400).json({ error: 'Validation error', details: parsedErrors })
      } else {
        console.error('Error in zodValidationMiddleware:', error)
        res.status(500).json({ error: 'An internal error occurred' })
      }
    }
  }
}
