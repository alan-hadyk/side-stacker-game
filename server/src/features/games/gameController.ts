import { GameModel } from "@app/features/games/gameModel"
import { GameObject, GameStateEnum } from "@app/features/games/gameObject"
import { RequestValidationService } from "@app/services/requestValidationService"
import { Request, Response, NextFunction } from "express"
import { convertObjectToObjectWithIsoDates } from "@app/helpers/objects/convertObjectToObjectWithIsoDates"
import { websocketsServer } from "@app/clients/websocketsServer"
import { GameService } from "@app/services/gameService"
import { z } from "zod"

export class GameController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      RequestValidationService.validateQuery(req.query, z.object({}))
      const { player1_id } = RequestValidationService.validateBody(
        req.body,
        GameObject.pick({
          player1_id: true,
        }),
      )

      const newGame = await GameModel.create({
        current_game_state: GameStateEnum.enum.waiting_for_players,
        next_possible_moves: JSON.stringify(
          GameService.calculateNextPossibleMoves(),
        ),
        player1_id,
      })

      const newGameWithIsoDates = {
        ...newGame,
        current_board_status: JSON.parse(newGame.current_board_status),
        next_possible_moves: JSON.parse(newGame.next_possible_moves),
        ...convertObjectToObjectWithIsoDates(newGame, ["created_at"]),
      }

      // Emit an event to all connected clients to invalidate the games query
      websocketsServer.emit("invalidateQuery", {
        entity: ["games", "list"],
      })

      res.json(newGameWithIsoDates)
    } catch (error) {
      next(error)
    }
  }
}
