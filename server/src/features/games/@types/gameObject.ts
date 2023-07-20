import {
  BoardMoveTypeEnum,
  CurrentGameStateEnum,
  GameObject,
} from "@app/features/games/gameObject"
import { z } from "zod"

export type CurrentGameStateEnum = z.infer<typeof CurrentGameStateEnum>
export type BoardMoveTypeEnum = z.infer<typeof BoardMoveTypeEnum>
export type Game = z.infer<typeof GameObject>
