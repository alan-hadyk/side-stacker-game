import { connectToDb, databasePool } from "@server/db/databasePool"
import { applyDbMigrations } from "@server/db/scripts/applyDbMigrations"
import { initDbExtensions } from "@server/db/scripts/initDbExtensions"
import { initDbTables } from "@server/db/scripts/initDbTables"

export const initDb = async () => {
  await connectToDb()

  await databasePool.connect(async (connection) => {
    // Initialize extensions
    await initDbExtensions(connection)

    // Create tables if they don't exist
    await initDbTables(connection)

    // Migrations
    await applyDbMigrations(connection)

    console.log("Database system is ready to accept connections")
  })
}
