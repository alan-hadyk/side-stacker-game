import { GameModel } from "@app/features/games/gameModel"
import { BoardMoveTypeEnum } from "@app/features/games/gameObject"
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

    const move =
      number_of_moves % 2 !== 0
        ? BoardMoveTypeEnum.enum.X
        : BoardMoveTypeEnum.enum.O

    const current_board_status = GameService.calculateBoardStatusAfterNextMove(
      parsedGame.current_board_status,
      position_y,
      position_x,
      move,
    )

    const next_possible_moves =
      GameService.calculateNextPossibleMoves(current_board_status)

    const winning_move = GameService.calculateWinningMove(current_board_status)

    const updatedGame = {
      ...game,
      current_board_status,
      next_possible_moves,
      number_of_moves,
    }

    await GameModel.update(game_id, {
      current_board_status: JSON.stringify(updatedGame.current_board_status),
      next_possible_moves: JSON.stringify(updatedGame.next_possible_moves),
      number_of_moves,
      ...(!isEmpty(winning_move) && {
        finished_at: 1,
        winner_id: player_id,
        winning_move: JSON.stringify(winning_move),
      }),
    })

    await MoveModel.create({
      game_id,
      move_number: number_of_moves,
      player_id,
      position_x,
      position_y,
    })

    WebsocketService.emitInvalidateQuery(["games", "list"])
    WebsocketService.emitInvalidateQuery(["games", "detail"], game_id)
  }
}
