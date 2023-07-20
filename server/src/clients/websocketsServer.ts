import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@app/clients/@types/websocketsServer"
import { IncomingMessage, Server, ServerResponse } from "http"
import { Server as SocketIOServer } from "socket.io"

let websocketsServer: SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

export const createWebsocketsServer = (
  httpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
) => {
  websocketsServer = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer)
}

export { websocketsServer }
