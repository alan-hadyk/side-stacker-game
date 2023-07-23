import { MoveObject } from "@app/features/moves/moveObject"
import { z } from "zod"
import { MoveTypeEnum } from "@app/features/games/gameObject"

export type Move = z.infer<typeof MoveObject>

export interface MoveResponse {
  created_at: string
  game_id: string
  move_id: string
  move_number: number
  move_type: typeof MoveTypeEnum.enum.X | typeof MoveTypeEnum.enum.O
  player_id: string
  position_x: number
  position_y: number
}
