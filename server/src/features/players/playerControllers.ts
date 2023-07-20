import { websocketsServer } from "@app/clients/websocketsServer"
import { PlayerModel } from "@app/features/players/playerModel"
import { PlayerObject } from "@app/features/players/playerObject"
import { convertObjectToObjectWithIsoDates } from "@app/helpers/objects/convertObjectToObjectWithIsoDates"
import { RequestValidationService } from "@app/services/requestValidationService"
import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"

export const playerControllers = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      RequestValidationService.validateQuery(req.query, [], [], [])
      const { username } = RequestValidationService.validateBody(
        req.body,
        PlayerObject.pick({ username: true }),
      )

      const session_id = uuidv4()

      const newPlayer = await PlayerModel.create({
        session_id,
        username,
      })

      const newPlayerWithIsoDates = {
        ...newPlayer,
        ...convertObjectToObjectWithIsoDates(newPlayer, [
          "created_at",
          "deleted_at",
          "last_active_at",
        ]),
      }

      // Emit an event to all connected clients to invalidate the players query
      websocketsServer.emit("invalidateQuery", {
        entity: ["players", "list"],
      })

      res.json({ ...newPlayerWithIsoDates, session_id })
    } catch (error) {
      next(error)
    }
  },
}
