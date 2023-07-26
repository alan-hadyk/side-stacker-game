import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@server/@types/websocketsServer"
import { Socket } from "socket.io"

export const handleSessionMiddleware = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) => {
  const req = socket.request

  if (!req.session.player_id) {
    console.log("DISCONNECTING SOCKET")
    socket.disconnect()
  }

  socket.use((__, next) => {
    req.session.reload((err) => {
      if (err) {
        socket.disconnect()
      } else {
        next()
      }
    })
  })
}
