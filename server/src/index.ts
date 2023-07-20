import {
  createWebsocketsServer,
  websocketsServer,
} from "@app/clients/websocketsServer"
import { config } from "@app/config"
import { initializers } from "@app/initializers"
import { useMiddlewares } from "@app/middlewares"
import { handleErrorsMiddleware } from "@app/middlewares/handleErrors"
import express from "express"
import { createServer } from "http"

const app = express()

const httpServer = createServer(app)
createWebsocketsServer(httpServer)

const startServer = async () => {
  // Initializers
  await Promise.all(initializers.map((initializer) => initializer()))

  // Middlewares
  await useMiddlewares(app)

  // Errors middleware
  app.use(handleErrorsMiddleware)

  websocketsServer.on("connection", (socket) => {
    console.log("websocketsServer connection")
    console.log({ socket })
  })

  websocketsServer.engine.on("connection_error", (err) => {
    console.log(err.req) // the request object
    console.log(err.code) // the error code, for example 1
    console.log(err.message) // the error message, for example "Session ID unknown"
    console.log(err.context) // some additional error context
  })

  const { appConfig } = config

  // Run the server at given host and port
  httpServer.listen(
    appConfig.httpServer.port,
    appConfig.httpServer.host,
    () => {
      console.log(
        `HTTP server running at http://${appConfig.httpServer.host}:${appConfig.httpServer.port}/`,
      )
    },
  )
}

startServer()
