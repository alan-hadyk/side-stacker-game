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
import { Move } from "@app/@types/moveObject"

export class GameService {
  static readonly BOARD_SIZE = 7

  static calculateBoardStatusAfterNextMove = (
    current_board_status: BoardMoveTypeEnumType[][],
    position_y: Move["position_y"],
    position_x: Move["position_x"],
    move: BoardMoveTypeEnumType,
  ) => {
    const currentBoardStatus = { ...current_board_status }

    currentBoardStatus[position_y][position_x] = move

    return currentBoardStatus
  }

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

    // Check if the game has been won
    if (current_board_status && GameService.checkWin(boardStatus)) {
      return []
    }

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

  static checkWin = (boardStatus: BoardMoveTypeEnumType[][]): boolean => {
    const counts = {
      [BoardMoveTypeEnum.enum.O]: {
        horizontal: Array(boardStatus[0].length).fill(0),
        vertical: Array(boardStatus.length).fill(0),
      },
      [BoardMoveTypeEnum.enum.X]: {
        horizontal: Array(boardStatus[0].length).fill(0),
        vertical: Array(boardStatus.length).fill(0),
      },
    }

    // Horizontal and vertical checks
    for (let rowIndex = 0; rowIndex < boardStatus.length; rowIndex++) {
      for (
        let cellIndex = 0;
        cellIndex < boardStatus[rowIndex].length;
        cellIndex++
      ) {
        const cell = boardStatus[rowIndex][cellIndex]
        if (
          cell === BoardMoveTypeEnum.enum.X ||
          cell === BoardMoveTypeEnum.enum.O
        ) {
          counts[cell].horizontal[rowIndex]++
          counts[cell].vertical[cellIndex]++
          if (
            counts[cell].horizontal[rowIndex] === 4 ||
            counts[cell].vertical[cellIndex] === 4
          ) {
            return true
          }
        } else {
          counts.X.horizontal[rowIndex] = 0
          counts.X.vertical[cellIndex] = 0
          counts.O.horizontal[rowIndex] = 0
          counts.O.vertical[cellIndex] = 0
        }
      }
    }

    // Diagonal checks
    for (let rowIndex = 0; rowIndex < boardStatus.length - 3; rowIndex++) {
      for (
        let cellIndex = 0;
        cellIndex < boardStatus[rowIndex].length - 3;
        cellIndex++
      ) {
        for (const cell of [
          BoardMoveTypeEnum.enum.X,
          BoardMoveTypeEnum.enum.O,
        ]) {
          if (
            [...Array(4).keys()].every(
              (i) => boardStatus[rowIndex + i][cellIndex + i] === cell,
            ) ||
            [...Array(4).keys()].every(
              (i) => boardStatus[rowIndex + 3 - i][cellIndex + i] === cell,
            )
          ) {
            return true
          }
        }
      }
    }

    return false
  }

  static determineCurrentGameState = (game: Game) => {
    if (game.finished_at) {
      return GameStateEnum.enum.finished
    }

    if (game.player1_id && game.player2_id) {
      return GameStateEnum.enum.in_progress
    }

    return GameStateEnum.enum.waiting_for_players
  }

  // TODO - Remove if unused
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

  static removePlayerFromActiveGames = async (
    player_id: Player["player_id"],
  ) => {
    const activeGamesWithPlayer = await GameModel.getAll({
      filterType: "OR",
      filters: {
        current_game_state: [
          GameStateEnum.enum.in_progress,
          GameStateEnum.enum.waiting_for_players,
        ],
        player1_id: player_id,
        player2_id: player_id,
      },
    })

    if (activeGamesWithPlayer.length > 0) {
      await Promise.all(
        activeGamesWithPlayer.map(async (game) => {
          const fieldsToUpdate = Object.entries(game)
            .filter(
              ([key, value]) =>
                value === player_id &&
                gameObjectKeys.includes(key as keyof Game),
            )
            .map(([key]) => key)

          if (fieldsToUpdate.length > 0) {
            // Create an object with the fields to update
            const updateObject = Object.fromEntries(
              fieldsToUpdate.map((field) => [field, ""]),
            )

            // Add the current_game_state field to the update object
            updateObject.current_game_state =
              GameStateEnum.enum.waiting_for_players

            await GameModel.update(game.game_id, updateObject)

            WebsocketService.emitInvalidateQuery(
              ["games", "detail"],
              game.game_id,
            )
          }

          return game
        }),
      )
    }
  }
}
