import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = require('./path-to-key')

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()
const auth = getAuth()

export { db, auth }
