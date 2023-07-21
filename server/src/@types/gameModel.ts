import { Game, GameStateEnum } from "@app/@types/gameObject"
import { OrderDirection } from "@app/@types/models"
import { PrimitiveValueExpression } from "slonik"

export interface GameModelGetAll {
  filters?: Partial<
    Record<
      keyof Pick<
        Game,
        | "player1_id"
        | "player2_id"
        | "current_player_id"
        | "current_game_state"
        | "winner_id"
      >,
      string | GameStateEnum
    >
  >
  filterType?: "AND" | "OR"
  limit?: number
  offset?: number
  orderBy?: keyof Game
  orderDirection?: OrderDirection
}

export type GameModelUpdateFieldsReturnType = Readonly<{
  type: "SLONIK_TOKEN_FRAGMENT"
  sql: string
  values: PrimitiveValueExpression[]
}>[]
