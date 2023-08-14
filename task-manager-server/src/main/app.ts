import express, { Application } from 'express'
import cors from 'cors'

import { Controller } from '@/types'

class App {
  public express: Application
  public port: number

  constructor(controllers: Controller[], port: number) {
    this.express = express()
    this.port = port

    this.initMiddlewares()
    this.initControllers(controllers)
  }

  private initMiddlewares() {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.express.use(controller.router)
    })
  }

  public listen() {
    this.express.listen(this.port, () => {
      console.log(`App listining at port ${this.port}`)
    })
  }
}

export default App
