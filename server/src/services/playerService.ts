import { PlayerResponse } from "@server/@types/api"
import { Player } from "@server/@types/playerObject"
import { convertObjectToObjectWithIsoDates } from "@server/helpers/objects/convertObjectToObjectWithIsoDates"

export class PlayerService {
  static parsePlayerToResponse = (
    player: Omit<Player, "password">,
    is_online?: boolean,
  ): PlayerResponse => {
    const { created_at, deleted_at, last_active_at, player_id, username } =
      player

    return {
      is_online,
      player_id,
      username,
      ...convertObjectToObjectWithIsoDates(
        { created_at, deleted_at, last_active_at },
        ["created_at", "deleted_at", "last_active_at"],
      ),
    }
  }
}
