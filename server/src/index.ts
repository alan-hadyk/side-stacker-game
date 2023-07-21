import { createWebsocketsServer } from "@app/clients/websocketsServer"
import { config } from "@app/config"
import { initializers } from "@app/initializers"
import { useHttpMiddlewares } from "@app/middlewares/http"
import { handleHttpErrorsMiddleware } from "@app/middlewares/http/handleHttpErrors"
import { useWsMiddlewares } from "@app/middlewares/ws"
import express from "express"
import { createServer as createHttpServer } from "http"

const startServer = async () => {
  const app = express()

  // Create http and ws servers
  const httpServer = createHttpServer(app)
  const websocketsServer = createWebsocketsServer(httpServer)

  // Initializers
  await Promise.all(initializers.map((initializer) => initializer()))

  // Middlewares
  useHttpMiddlewares(app)
  useWsMiddlewares(websocketsServer)

  // HTTP Errors middleware - has to be used after routing
  app.use(handleHttpErrorsMiddleware)

  const { appConfig } = config
  const { host, port } = appConfig.httpServer

  // Run ws & http server
  websocketsServer.listen(port)
  httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`)
    console.log(`WS server running at ws://${host}:${port}/`)
  })
}

startServer()
