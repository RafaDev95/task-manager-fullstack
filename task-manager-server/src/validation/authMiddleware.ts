import { NextFunction, Request, Response } from 'express'
import { auth } from '@/config/firebase'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1]

  if (!accessToken) {
    return res.status(401).json({ message: 'No token provided.' })
  }

  try {
    await auth.verifyIdToken(accessToken)
    next()
  } catch (error) {
    console.error('Error verifying Firebase access token:', error)
    return res.status(403).json({ message: 'Failed to authenticate token.' })
  }
}

export default authMiddleware
