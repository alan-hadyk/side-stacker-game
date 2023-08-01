import { Player } from "@server/@types/playerObject"
import { PlayerObject } from "@server/features/players/playerObject"
import { DatabasePoolConnection, createSqlTag } from "slonik"

const sql = createSqlTag({
  typeAliases: {
    player: PlayerObject,
  },
})

export const queryAuthenticatedUser = async (
  connection: DatabasePoolConnection,
  username: Player["username"],
) => {
  const { rows } = await connection.query(
    sql.typeAlias("player")`
        SELECT * 
        FROM players 
        WHERE username = ${username}
    `,
  )

  return rows[0]
}
