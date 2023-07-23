import { PlayerObject } from "@app/features/players/playerObject"
import { z } from "zod"

export type Player = z.infer<typeof PlayerObject>

export interface PlayerResponse {
  created_at: string
  deleted_at: string | null
  last_active_at: string
  player_id: string
  username: string
}
