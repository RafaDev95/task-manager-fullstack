import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './config'

export const registerUser = async (email: string, password: string) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
  const user = response.user
  return user
}
