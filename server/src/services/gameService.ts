import { websocketsServer } from "@app/clients/websocketsServer"
import { BoardMoveTypeEnum as BoardMoveTypeEnumType } from "@app/@types/gameObject"
import { GameModel } from "@app/features/games/gameModel"
import {
  BoardMoveTypeEnum,
  GameStateEnum,
} from "@app/features/games/gameObject"
import { Player } from "@app/@types/playerObject"

export class GameService {
  static calculateNextPossibleMoves = (
    current_board_status?: BoardMoveTypeEnumType[][],
  ) => {
    const currentBoardStatusRowInit = new Array(7).fill(
      BoardMoveTypeEnum.enum.empty,
    )
    const currentBoardStatusInit: BoardMoveTypeEnumType[][] = new Array(7).fill(
      currentBoardStatusRowInit,
    )

    const currentBoardStatus = current_board_status || currentBoardStatusInit

    const nextPossibleMoves: number[][] = []

    currentBoardStatus.forEach((row, rowIndex) => {
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
  }
}
