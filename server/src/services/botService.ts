import { MoveTypeEnum } from "@server/@types/api"
import { Game } from "@server/@types/gameObject"
import { GameModel } from "@server/features/games/gameModel"
import { MoveModel } from "@server/features/moves/moveModel"
import { GameService } from "@server/services/gameService"
import { cloneDeep, isEmpty } from "lodash"

export class BotService {
  /**
   * makeAMove makes a move on behalf of bot.
   * First, a random move is selected from the pool of available moves (next_possible_moves).
   * Then, if bot might make a winning move - that move is chosen.
   */
  static makeAMove = async (game_id: Game["game_id"]) => {
    // Retrieve the game by its id
    const game = await GameModel.getById(game_id)
    // Parse the game to a format that's easier to work with.
    const parsedGame = GameService.parseGameToResponse(game)

    // Grab next possible move.
    const nextPossibleMoves = game.next_possible_moves

    // Choose a random move from available moves.
    let nextMove =
      nextPossibleMoves[Math.floor(Math.random() * nextPossibleMoves.length)]

    // Iterate over next possible moves.
    for (let index = 0; index < nextPossibleMoves.length; index++) {
      const move = nextPossibleMoves[index]

      // Make a deep clone of `current_board_status` (which is an array of arrays - `MoveTypeEnum[][]`)
      // Deep clone is needed, because otherwise each iteration of the for loop
      // will modify the same `current_board_status`, and the bot will make multiple
      // moves instead of 1. That would lead to bot winning the game each time after
      // first move.
      const gameBoardStatus = cloneDeep(parsedGame.current_board_status)

      // "Simulate" board status after given move.
      gameBoardStatus[move[0]][move[1]] = MoveTypeEnum.O

      // Check if there's a winning move for the simulated board status.
      const winningMoves = GameService.calculateWinningMoves(gameBoardStatus)

      // If there's a winning move..
      if (!isEmpty(winningMoves)) {
        // ..assign that move to the actual move made by bot.
        nextMove = move
      }
    }

    // Check to make sure that `player2_id` exists
    if (!game.player2_id) {
      return
    }

    // Calculate the game state after the proposed move
    const { moveType, updatedGame } = GameService.calculateGameAfterMove(
      parsedGame,
      nextMove[0],
      nextMove[1],
      game.player2_id,
    )

    // Update the game with the new state
    await GameService.updateGame(game_id, updatedGame)

    // Create the move in the database
    await MoveModel.create({
      game_id,
      move_number: updatedGame.number_of_moves,
      move_type: moveType,
      player_id: game.player2_id,
      position_x: nextMove[1],
      position_y: nextMove[0],
    })
  }
}
