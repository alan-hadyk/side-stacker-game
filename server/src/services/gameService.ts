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
