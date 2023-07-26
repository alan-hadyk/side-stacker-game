import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@server/@types/websocketsServer"
import { sessionMiddleware } from "@server/middlewares/http/session"
import { handleSessionMiddleware } from "@server/middlewares/ws/handleSession"
import { logWsErrorsMiddleware } from "@server/middlewares/ws/logWsErrors"
import { Server as SocketIOServer } from "socket.io"

export const useWsMiddlewares = (
  websocketsServer: SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) => {
  // Use express-session middleware
  websocketsServer.engine.use(sessionMiddleware)

  // Websockets errors
  websocketsServer.engine.on("connection_error", logWsErrorsMiddleware)

  websocketsServer.on("connection", handleSessionMiddleware)
}
