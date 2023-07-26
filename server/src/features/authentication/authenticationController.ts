import { PlayerModel } from "@server/features/players/playerModel"
import { PlayerObject } from "@server/features/players/playerObject"
import { RequestValidationService } from "@server/services/requestValidationService"
import { Request, Response } from "express"
import { z } from "zod"
import { PlayerService } from "@server/services/playerService"
import { WebsocketService } from "@server/services/websocketService"
import { QueryKeys } from "@server/@types/api"
import { PasswordService } from "@server/services/passwordService"
import { SessionService } from "@server/services/sessionService"
import { AuthenticationError } from "@server/errors/authenticationError"

export class AuthenticationController {
  static signIn = async (req: Request, res: Response) => {
    RequestValidationService.validateQuery(req.query, z.object({}))
    const { password, username } = RequestValidationService.validateBody(
      req.body,
      PlayerObject.pick({ password: true, username: true }),
    )

    const existingPlayers = await PlayerModel.getAll({
      filters: {
        username,
      },
    })

    const player = existingPlayers[0]

    if (!player) {
      throw new AuthenticationError("Incorrect username or password", 401)
    }

    const isPasswordValid = await PasswordService.verify(
      player.password,
      password,
    )

    if (!isPasswordValid) {
      throw new AuthenticationError("Incorrect username or password", 401)
    }

    await PlayerModel.update(player.player_id, {})

    WebsocketService.emitInvalidateQuery([QueryKeys.Players, QueryKeys.List])
    WebsocketService.emitInvalidateQuery(
      [QueryKeys.Players, QueryKeys.Detail],
      player.player_id,
    )
    WebsocketService.emitToast(`${player.username} is online`)

    SessionService.setSessionData(req, {
      player_id: player.player_id,
    })

    const playerResponse = PlayerService.parsePlayerToResponse(player)

    res.json(playerResponse)
  }

  static signOut = async (req: Request, res: Response) => {
    const { player_id } = SessionService.getSessionData(req, res)

    if (!player_id) {
      return
    }

    RequestValidationService.validateQuery(req.query, z.object({}))
    RequestValidationService.validateBody(req.body, z.object({}))

    await PlayerModel.update(player_id, {})

    SessionService.destroySession(req, res)
  }
}
