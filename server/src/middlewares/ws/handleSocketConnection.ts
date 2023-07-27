import { QueryKeys } from "@server/@types/api"
import { RedisKey } from "@server/@types/redis"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@server/@types/websocketsServer"
import { redisClient } from "@server/clients/redis"
import { WebsocketService } from "@server/services/websocketService"
import { Socket } from "socket.io"

export const handleSocketConnectionMiddleware = async (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) => {
  const req = socket.request
  const player_id = req.session.player_id

  if (!player_id) {
    socket.disconnect()
  } else {
    // Store active players in Redis
    await redisClient.sAdd(RedisKey.OnlineUsers, player_id)
  }

  socket.on("disconnect", async () => {
    const req = socket.request
    const player_id = req.session.player_id

    if (player_id) {
      await redisClient.sRem(RedisKey.OnlineUsers, player_id)

      WebsocketService.emitInvalidateQuery([QueryKeys.Players, QueryKeys.List])
      WebsocketService.emitInvalidateQuery(
        [QueryKeys.Players, QueryKeys.Detail],
        player_id,
      )
    }
  })

  socket.use((__, next) => {
    req.session.reload((err) => {
      if (err) {
        socket.disconnect()
      } else {
        req.session.save()
        next()
      }
    })
  })
}
