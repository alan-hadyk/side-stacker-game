import { sessionMiddleware } from "@server/middlewares/http/session"
import cors from "cors"
import express, { Express } from "express"

export const useHttpMiddlewares = (app: Express) => {
  // Initialize session storage
  app.use(sessionMiddleware)

  // Parse application/json
  app.use(express.json())

  // Enable CORS
  app.use(cors({ credentials: true, origin: "http://127.0.0.1:4000" }))
}
