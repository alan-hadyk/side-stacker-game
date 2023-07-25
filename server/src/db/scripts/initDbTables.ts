import { GamesTableInit } from "@server/features/games/gameModel"
import { MovesTableInit } from "@server/features/moves/moveModel"
import { PlayersTableInit } from "@server/features/players/playerModel"
import { DatabasePoolConnection } from "slonik"

export const initDbTables = async (connection: DatabasePoolConnection) => {
  await connection.query(PlayersTableInit)
  await connection.query(GamesTableInit)
  await connection.query(MovesTableInit)
}
