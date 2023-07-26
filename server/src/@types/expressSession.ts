import { Player } from "@server/@types/playerObject"
import { SessionData } from "express-session"

export interface CustomSessionData extends SessionData {
  player_id?: Player["player_id"]
}
