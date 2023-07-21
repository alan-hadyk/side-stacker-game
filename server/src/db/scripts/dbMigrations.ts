import {
  createSqlTag,
  DatabasePoolConnection,
  DatabaseTransactionConnection,
} from "slonik"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { MigrationObject } from "@app/db/utils/objects/migrationObject"
import { z } from "zod"

export const migrationsSql = createSqlTag({
  typeAliases: {
    migration: MigrationObject,
    null: z.null(),
  },
})

export const getMigrationsDir = (type: "up" | "down") =>
  path.resolve(process.cwd(), `src/db/migrations/${type}`)

export const getMigrationFiles = async (migrationsDir: string) => {
  const migrationFiles = await readdir(migrationsDir)

  migrationFiles.sort()

  return migrationFiles
}

export const getExecutedMigrations = async (
  connection: DatabasePoolConnection,
) => {
  const executedMigrations = await connection.query(
    migrationsSql.typeAlias("migration")`
      SELECT name 
      FROM migrations
    `,
  )
  return executedMigrations.rows.map((migration) => migration.name)
}

export const executeMigration = async (
  transactionConnection: DatabaseTransactionConnection,
  migrationsDir: string,
  file: string,
) => {
  const migrationFileSql = await readFile(
    path.join(migrationsDir, file),
    "utf8",
  )

  await transactionConnection.query(migrationsSql.unsafe([migrationFileSql]))
}
