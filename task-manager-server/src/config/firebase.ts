import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = require('./task-manage-5241f-firebase-adminsdk-zmd3t-f7f30ec02b.json')

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()
const auth = getAuth()

export { db, auth }
