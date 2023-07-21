import {
  BoardMoveTypeEnum as BoardMoveTypeEnumType,
  Game,
} from "@app/@types/gameObject"
import { GameModel } from "@app/features/games/gameModel"
import {
  BoardMoveTypeEnum,
  GameStateEnum,
  gameObjectKeys,
} from "@app/features/games/gameObject"
import { Player } from "@app/@types/playerObject"
import { WebsocketService } from "@app/services/websocketService"
import { convertObjectToObjectWithIsoDates } from "@app/helpers/objects/convertObjectToObjectWithIsoDates"
import { GameResponse } from "@app/@types/gameService"
import { convertDateISOStringToTimestamp } from "@app/helpers/dates/convertDateISOStringToTimestamp"

export class GameService {
  static readonly BOARD_SIZE = 7

  static calculateNextPossibleMoves = (
    current_board_status?: BoardMoveTypeEnumType[][],
  ) => {
    const boardStatusRowInit = new Array(GameService.BOARD_SIZE).fill(
      BoardMoveTypeEnum.enum.empty,
    )
    const boardStatusInit: BoardMoveTypeEnumType[][] = new Array(
      GameService.BOARD_SIZE,
    ).fill(boardStatusRowInit)

    const boardStatus = current_board_status || boardStatusInit

    const nextPossibleMoves: number[][] = []

    boardStatus.forEach((row, rowIndex) => {
      const leftMostEmptyIndex = row.indexOf(BoardMoveTypeEnum.enum.empty)
      const rightMostEmptyIndex = row.lastIndexOf(BoardMoveTypeEnum.enum.empty)

      if (leftMostEmptyIndex !== -1) {
        nextPossibleMoves.push([rowIndex, leftMostEmptyIndex])
      }

      if (
        rightMostEmptyIndex !== -1 &&
        rightMostEmptyIndex !== leftMostEmptyIndex
      ) {
        nextPossibleMoves.push([rowIndex, rightMostEmptyIndex])
      }
    })

    return nextPossibleMoves
  }

  static parseRequestToGame = (game: Partial<GameResponse>) => {
    const { current_board_status, created_at, next_possible_moves } = game

    return {
      ...game,
      created_at: created_at
        ? convertDateISOStringToTimestamp(created_at)
        : undefined,
      current_board_status: current_board_status
        ? JSON.stringify(current_board_status)
        : undefined,
      next_possible_moves: next_possible_moves
        ? JSON.stringify(next_possible_moves)
        : undefined,
    }
  }

  static parseGameToResponse = (game: Game): GameResponse => {
    const { current_board_status, created_at, next_possible_moves } = game

    return {
      ...game,
      current_board_status: JSON.parse(current_board_status),
      next_possible_moves: JSON.parse(next_possible_moves),
      ...convertObjectToObjectWithIsoDates({ created_at }, ["created_at"]),
    }
  }

  static removeDeletedPlayerFromGames = async (deletedPlayer: Player) => {
    const gamesWithDeletedPlayer = await GameModel.getAll({
      filterType: "OR",
      filters: {
        current_game_state: GameStateEnum.enum.in_progress,
        current_player_id: deletedPlayer.player_id,
        player1_id: deletedPlayer.player_id,
        player2_id: deletedPlayer.player_id,
      },
    })

    if (gamesWithDeletedPlayer.length > 0) {
      await Promise.all(
        gamesWithDeletedPlayer.map(async (game) => {
          const fieldsToUpdate = Object.entries(game)
            .filter(
              ([key, value]) =>
                value === deletedPlayer.player_id &&
                gameObjectKeys.includes(key as keyof Game),
            )
            .map(([key]) => key)

          if (fieldsToUpdate.length > 0) {
            await GameModel.update(
              game.game_id,
              Object.fromEntries(fieldsToUpdate.map((field) => [field, ""])),
            )

            WebsocketService.emitInvalidateQuery(
              ["games", "detail"],
              game.game_id,
            )
          }

          return game
        }),
      )

      // Emit an event to all connected clients to invalidate the games queries
      WebsocketService.emitInvalidateQuery(["games", "list"])
    }
  }
}
