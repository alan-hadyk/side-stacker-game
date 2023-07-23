import { Player } from "@app/@types/api"

export const queryKeys = {
  players: {
    detail: (player_id?: Player["player_id"]) => [
      "players",
      "detail",
      player_id,
    ],
    list: ["players", "list"],
  },
}
