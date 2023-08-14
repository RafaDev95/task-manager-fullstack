import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './config'

export const login = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password)
  const user = response.user
  return user
}
