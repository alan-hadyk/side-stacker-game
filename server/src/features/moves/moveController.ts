import { Game } from "@app/@types/gameObject"
import { GameModel } from "@app/features/games/gameModel"
import { MoveTypeEnum, GameStateEnum } from "@app/features/games/gameObject"
import { MoveModel } from "@app/features/moves/moveModel"
import { MoveObject } from "@app/features/moves/moveObject"
import { GameService } from "@app/services/gameService"
import { RequestValidationService } from "@app/services/requestValidationService"
import { WebsocketService } from "@app/services/websocketService"
import { Request } from "express"
import isEmpty from "lodash/isEmpty"
import { z } from "zod"

export class MoveController {
  static create = async (req: Request) => {
    RequestValidationService.validateQuery(req.query, z.object({}))
    const { game_id, player_id, position_x, position_y } =
      RequestValidationService.validateBody(
        req.body,
        MoveObject.pick({
          game_id: true,
          player_id: true,
          position_x: true,
          position_y: true,
        }),
      )

    const game = await GameModel.getById(game_id)
    const parsedGame = GameService.parseGameToResponse(game)
    const number_of_moves = parsedGame.number_of_moves + 1

    const move_type =
      number_of_moves % 2 !== 0 ? MoveTypeEnum.enum.X : MoveTypeEnum.enum.O

    const current_board_status = GameService.calculateBoardStatusAfterNextMove(
      parsedGame.current_board_status,
      position_y,
      position_x,
      move_type,
    )

    const next_possible_moves =
      GameService.calculateNextPossibleMoves(current_board_status)

    const winning_moves =
      GameService.calculateWinningMoves(current_board_status)

    const updatedGame: Partial<Game> = {
      current_board_status: JSON.stringify(current_board_status),
      next_possible_moves: JSON.stringify(next_possible_moves),
      number_of_moves,
    }

    if (isEmpty(next_possible_moves)) {
      updatedGame.finished_at = 1
      updatedGame.current_game_state = GameStateEnum.enum.finished

      if (!isEmpty(winning_moves)) {
        updatedGame.winner_id = player_id
        updatedGame.winning_moves = JSON.stringify(winning_moves)
      }
    }

    await GameModel.update(game_id, updatedGame)

    await MoveModel.create({
      game_id,
      move_number: number_of_moves,
      move_type,
      player_id,
      position_x,
      position_y,
    })

    WebsocketService.emitInvalidateQuery(["games", "list"])
    WebsocketService.emitInvalidateQuery(["games", "detail"], game_id)
  }
}
