import cors from "cors"
import express, { Express } from "express"
import session from "express-session"
import { redisStore } from "@server/clients/redis"

export const useHttpMiddlewares = (app: Express) => {
  // Initialize session storage
  app.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // A week. Session expiration time (in milliseconds)
        sameSite: "lax",
        secure: false, // Set to true for HTTPS connections
      },
      name: "session",
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "some_secret", // In real app, this obviously wouldn't be exposed in the source code.
      store: redisStore, // Use Redis to store sessions
    }),
  )

  // Parse application/json
  app.use(express.json())

  // Enable CORS
  app.use(cors({ credentials: true, origin: "http://127.0.0.1:4000" }))
}
