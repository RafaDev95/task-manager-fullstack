import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAlYf2LDujDKkrMRstz9ioZ4dOLccF1JYc',
  authDomain: 'task-manage-5241f.firebaseapp.com',
  databaseURL: 'https://task-manage-5241f-default-rtdb.firebaseio.com',
  projectId: 'task-manage-5241f',
  storageBucket: 'task-manage-5241f.appspot.com',
  messagingSenderId: '777679716952',
  appId: '1:777679716952:web:782728fdbd7af735c5402d',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
