import { GameModel } from "@app/features/games/gameModel"
import { GameObject, GameStateEnum } from "@app/features/games/gameObject"
import { RequestValidationService } from "@app/services/requestValidationService"
import { Request, Response } from "express"
import { GameService } from "@app/services/gameService"
import { z } from "zod"
import { WebsocketService } from "@app/services/websocketService"

export class GameController {
  static create = async (req: Request, res: Response) => {
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

    const newGameWithIsoDates = GameService.parseGameToResponse(newGame)

    // Emit an event to all connected clients to invalidate the games query
    WebsocketService.emitInvalidateQuery(["games", "list"])

    res.json(newGameWithIsoDates)
  }
}
