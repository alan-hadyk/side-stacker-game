import { createWebsocketsServer } from "@server/clients/websocketsServer"
import { config } from "@server/config"
import { authenticationRouter } from "@server/features/authentication/authenticationRoutes"
import { gamesRouter } from "@server/features/games/gameRoutes"
import { movesRouter } from "@server/features/moves/moveRoutes"
import { playersRouter } from "@server/features/players/playerRoutes"
import { initializers } from "@server/initializers"
import { useHttpMiddlewares } from "@server/middlewares/http"
import { httpErrorsMiddleware } from "@server/middlewares/http/httpErrors"
import { useWsMiddlewares } from "@server/middlewares/ws"
import { Path } from "@server/routes/paths"
import express from "express"
import {
  createServer as createHttpServer,
  IncomingMessage,
  ServerResponse,
  Server,
} from "http"

const app = express()
let httpServer: Server<typeof IncomingMessage, typeof ServerResponse>

/**
 * Starts the server.
 */
const startServer = async () => {
  // Create http and ws servers
  httpServer = createHttpServer(app)
  const websocketsServer = createWebsocketsServer(httpServer)

  // Initializers
  await Promise.all(initializers.map((initializer) => initializer()))

  // Middlewares
  useHttpMiddlewares(app)
  useWsMiddlewares(websocketsServer)

  // Routes
  app.use(Path.Root, gamesRouter)
  app.use(Path.Root, movesRouter)
  app.use(Path.Root, playersRouter)
  app.use(Path.Root, authenticationRouter)

  // HTTP Errors logging middlewares - have to be used after routing
  app.use(httpErrorsMiddleware)

  const { appConfig } = config
  const { host, port } = appConfig.httpServer

  // Run http server
  httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`)
    console.log(`WS server running at ws://${host}:${port}/`)
  })
}

if (process.env["NODE_ENV"] !== "test") {
  startServer()
}

export { app, startServer, httpServer }
