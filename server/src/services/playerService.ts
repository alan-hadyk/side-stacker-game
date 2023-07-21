import { Player } from "@app/@types/playerObject"
import { convertObjectToObjectWithIsoDates } from "@app/helpers/objects/convertObjectToObjectWithIsoDates"

export class PlayerService {
  static convertDatesToIso = (
    player: Player,
  ): Omit<
    Player,
    "created_at" | "deleted_at" | "last_active_at" | "session_id"
  > & {
    created_at: string
    deleted_at?: string
    last_active_at: string
  } => {
    const { created_at, deleted_at, last_active_at, ...rest } = player

    return {
      player_id: rest.player_id,
      username: rest.username,
      ...convertObjectToObjectWithIsoDates(
        { created_at, deleted_at, last_active_at },
        ["created_at", "deleted_at", "last_active_at"],
      ),
    }
  }
}
