import { GamesGetAllQueryParams, PlayerResponse } from "@server/@types/api"

export const queryKeys = {
  games: {
    list: (params?: GamesGetAllQueryParams) => ["players", "list", params],
  },
  players: {
    detail: (player_id?: PlayerResponse["player_id"]) => [
      "players",
      "detail",
      player_id,
    ],
    list: ["players", "list"],
  },
}
