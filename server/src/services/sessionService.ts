import { CustomSessionData } from "@server/@types/expressSession"
import { Player } from "@server/@types/playerObject"
import { websocketsServer } from "@server/clients/websocketsServer"
import { Request, Response } from "express"

export class SessionService {
  static setSessionData = (
    req: Request,
    { player_id }: Pick<Player, "player_id">,
  ) => {
    ;(req.session as CustomSessionData).player_id = player_id

    req.session.save((err) => {
      if (err) {
        console.log("Session was not saved", err)
      } else {
        console.log("Session was saved")
      }
    })
  }

  static getSessionData = (req: Request, res: Response) => {
    const player_id = (req.session as CustomSessionData).player_id

    if (!player_id) {
      res.writeHead(401)
      res.end()
    }

    return req.session as unknown as { player_id?: string }
  }

  static destroySession = (req: Request, res: Response) => {
    const sessionId = req.session.id

    req.session.destroy((err) => {
      if (err) {
        console.error("Error while destroying session", err)
      } else {
        websocketsServer.in(sessionId).disconnectSockets()

        // Clear the session cookie
        res.clearCookie("session")
        // Session is successfully destroyed
        res.sendStatus(204) // Send a "No Content" response
      }
    })
  }
}
