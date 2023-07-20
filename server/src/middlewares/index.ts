import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@app/clients/@types/websocketsServer"
import { handleWsErrors } from "@app/middlewares/handleWsErrors"
import express, { Express } from "express"
import { Server as SocketIOServer } from "socket.io"

export const useMiddlewares = async (
  app: Express,
  websocketsServer: SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) => {
  // Parse application/json
  app.use(express.json())

  // Websockets logging
  websocketsServer.engine.on("connection_error", handleWsErrors)
  websocketsServer.on("connection", (socket) => {
    console.log("websocketsServer connection")
    console.log({ socket })
  })
}
