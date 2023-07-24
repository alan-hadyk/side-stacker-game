import { GameResponse } from "@server/@types/api"

export const calculateNumberOfPlayersInGame = (
  game: Pick<GameResponse, "player1_id" | "player2_id">,
) => {
  const { player1_id, player2_id } = game

  if (player1_id && player2_id) {
    return 2
  } else if (!player1_id && !player2_id) {
    return 0
  }

  return 1
}
