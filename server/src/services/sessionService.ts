import { CustomSessionData } from "@server/@types/expressSession"
import { Player } from "@server/@types/playerObject"
import { Request, Response } from "express"

export class SessionService {
  static setSessionData = (
    req: Request,
    { player_id }: Pick<Player, "player_id">,
  ) => {
    ;(req.session as CustomSessionData).player_id = player_id
  }

  static getSessionData = (req: Request, res: Response) => {
    const player_id = (req.session as CustomSessionData).player_id

    if (!player_id) {
      res.writeHead(401)
      res.end()
    }

    return req.session as unknown as { player_id?: string }
  }
}
