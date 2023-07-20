import { websocketsServer } from "@app/clients/websocketsServer"
import { GameModel } from "@app/features/games/gameModel"
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

      res.json(newPlayerWithIsoDates)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      RequestValidationService.validateQuery(req.query, [], [], [])
      const { session_id } = RequestValidationService.validateBody(
        req.body,
        PlayerObject.omit({
          created_at: true,
          deleted_at: true,
          last_active_at: true,
          player_id: true,
          username: true,
        }),
      )
      const { player_id } = RequestValidationService.validateParams(
        req.params,
        PlayerObject.pick({ player_id: true }),
      )

      const deletedPlayer = await PlayerModel.delete(player_id, session_id)

      const deletedPlayerWithIsoDates = {
        ...deletedPlayer,
        ...convertObjectToObjectWithIsoDates(deletedPlayer, [
          "created_at",
          "deleted_at",
          "last_active_at",
        ]),
      }

      try {
        const gamesWithDeletedPlayer = await GameModel.getAll({
          filterType: "OR",
          filters: {
            current_player_id: deletedPlayer.player_id,
            player1_id: deletedPlayer.player_id,
            player2_id: deletedPlayer.player_id,
          },
        })

        if (gamesWithDeletedPlayer.length > 0) {
          await Promise.all(
            gamesWithDeletedPlayer.map((game) => {
              const field = Object.entries(game).find(
                ([, value]) => value === deletedPlayer.player_id,
              )?.[0]

              if (field) {
                return GameModel.update(game.game_id, {
                  [field]: "",
                })
              }

              return game
            }),
          )
          // Emit an event to all connected clients to invalidate the games query
          websocketsServer.emit("invalidateQuery", {
            entity: ["games", "list"],
          })
        }
      } catch (error) {
        console.error(error)
      }

      // Emit an event to all connected clients to invalidate the players query
      websocketsServer.emit("invalidateQuery", {
        entity: ["players", "list"],
      })

      res.json(deletedPlayerWithIsoDates)
    } catch (error) {
      next(error)
    }
  },
}
