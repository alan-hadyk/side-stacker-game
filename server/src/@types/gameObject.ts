import {
  MoveTypeEnum,
  GameStateEnum,
  GameObject,
} from "@app/features/games/gameObject"
import { z } from "zod"

export type GameStateEnum = z.infer<typeof GameStateEnum>
export type MoveTypeEnum = z.infer<typeof MoveTypeEnum>
export type Game = z.infer<typeof GameObject>

export type GameResponse = Omit<
  Game,
  "current_board_status" | "created_at" | "next_possible_moves"
> & {
  current_board_status: MoveTypeEnum[][]
  created_at: string
  next_possible_moves: number[][]
}
