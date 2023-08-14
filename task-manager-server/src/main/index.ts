import makeTaskController from '@/controllers/TaskController'
import App from './app'

const PORT = process.env.PORT || 5000

const app = new App([makeTaskController], Number(PORT))

app.listen()

app.express.get('/', (req, res) => {
  res.send({ message: 'Success' }).status(200)
})
