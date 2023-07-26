import { PlayerModel } from "@server/features/players/playerModel"
import { PlayerObject } from "@server/features/players/playerObject"
import { GameService } from "@server/services/gameService"
import { RequestValidationService } from "@server/services/requestValidationService"
import { Request, Response } from "express"
import { z } from "zod"
import { OrderDirection } from "@server/@types/models"
import { PlayerService } from "@server/services/playerService"
import { WebsocketService } from "@server/services/websocketService"
import { QueryKeys } from "@server/@types/api"
import { PasswordService } from "@server/services/passwordService"
import { SessionService } from "@server/services/sessionService"
import { ValidationError } from "@server/errors/validationError"
import { AuthenticationError } from "@server/errors/authenticationError"

export class PlayerController {
  static create = async (req: Request, res: Response) => {
    RequestValidationService.validateQuery(req.query, z.object({}))
    const body = RequestValidationService.validateBody(
      req.body,
      PlayerObject.pick({ password: true, username: true }),
    )

    const existingPlayers = await PlayerModel.getAll({
      filters: {
        username: body.username,
      },
    })

    if (existingPlayers.length > 0) {
      throw new ValidationError(`${body.username} is not available`)
    }

    const hashedPassword = await PasswordService.hash(body.password)

    const newPlayer = await PlayerModel.create({
      password: hashedPassword,
      username: body.username,
    })

    SessionService.setSessionData(req, {
      player_id: newPlayer.player_id,
    })

    const newPlayerResponse = PlayerService.parsePlayerToResponse(newPlayer)

    WebsocketService.emitToast(`New Player - ${newPlayerResponse.username}`)

    // Emit an event to all connected clients to invalidate the players query
    WebsocketService.emitInvalidateQuery([QueryKeys.Players, QueryKeys.List])

    res.json(newPlayerResponse)
  }

  static delete = async (req: Request, res: Response) => {
    const { player_id: sessionPlayerId } = SessionService.getSessionData(
      req,
      res,
    )

    if (!sessionPlayerId) {
      return
    }

    RequestValidationService.validateQuery(req.query, z.object({}))
    RequestValidationService.validateBody(req.body, z.object({}))
    const { player_id } = RequestValidationService.validateParams(
      req.params,
      PlayerObject.pick({ player_id: true }),
    )

    if (player_id !== sessionPlayerId) {
      res.status(403)
      res.end()
      return
    }

    const deletedPlayer = await PlayerModel.delete(player_id)

    await GameService.removePlayerFromActiveGames(deletedPlayer.player_id)

    // Emit an event to all connected clients to invalidate the players query
    WebsocketService.emitInvalidateQuery([QueryKeys.Players, QueryKeys.List])
    WebsocketService.emitInvalidateQuery(
      [QueryKeys.Players, QueryKeys.Detail],
      deletedPlayer.player_id,
    )
    // Emit an event to all connected clients to invalidate the games queries
    WebsocketService.emitInvalidateQuery([QueryKeys.Games, QueryKeys.List])

    const deletedPlayerResponse =
      PlayerService.parsePlayerToResponse(deletedPlayer)

    res.json(deletedPlayerResponse)
  }

  static getAll = async (req: Request, res: Response) => {
    const { player_id } = SessionService.getSessionData(req, res)

    if (!player_id) {
      return
    }

    const { limit, offset, orderBy, orderDirection } =
      RequestValidationService.validateQuery(
        req.query,
        z.object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          orderBy: z
            .enum([
              "created_at",
              "deleted_at",
              "last_active_at",
              "player_id",
              "username",
            ])
            .optional(),
          orderDirection: z
            .enum([OrderDirection.ASC, OrderDirection.DESC])
            .optional(),
        }),
      )
    RequestValidationService.validateBody(req.body, z.object({}))

    const players = await PlayerModel.getAll({
      limit,
      offset,
      orderBy,
      orderDirection,
    })

    const playersResponse = players.map(PlayerService.parsePlayerToResponse)

    res.json(playersResponse)
  }

  static getById = async (req: Request, res: Response) => {
    const { player_id } = SessionService.getSessionData(req, res)

    if (!player_id) {
      return
    }

    RequestValidationService.validateQuery(req.query, z.object({}))
    RequestValidationService.validateBody(req.body, z.object({}))
    const params = RequestValidationService.validateParams(
      req.params,
      PlayerObject.pick({ player_id: true }),
    )

    const player = await PlayerModel.getById(params.player_id)
    const playerResponse = PlayerService.parsePlayerToResponse(player)

    res.json(playerResponse)
  }

  static getCurrent = async (req: Request, res: Response) => {
    const { player_id } = SessionService.getSessionData(req, res)

    if (!player_id) {
      return
    }

    RequestValidationService.validateQuery(req.query, z.object({}))
    RequestValidationService.validateBody(req.body, z.object({}))

    const player = await PlayerModel.getById(player_id)

    await PlayerModel.update(player_id, {})

    WebsocketService.emitToast(`${player.username} is online`)
    WebsocketService.emitInvalidateQuery([QueryKeys.Players, QueryKeys.List])
    WebsocketService.emitInvalidateQuery(
      [QueryKeys.Players, QueryKeys.Detail],
      player.player_id,
    )

    const playerResponse = PlayerService.parsePlayerToResponse(player)

    res.json(playerResponse)
  }

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

    WebsocketService.emitToast(`${player.username} is online`)
    WebsocketService.emitInvalidateQuery([QueryKeys.Players, QueryKeys.List])
    WebsocketService.emitInvalidateQuery(
      [QueryKeys.Players, QueryKeys.Detail],
      player.player_id,
    )

    SessionService.setSessionData(req, {
      player_id: player.player_id,
    })

    const playerResponse = PlayerService.parsePlayerToResponse(player)

    res.json(playerResponse)
  }

  // TODO - Remove if unused
  static update = async (req: Request, res: Response) => {
    const { player_id: sessionPlayerId } = SessionService.getSessionData(
      req,
      res,
    )

    if (!sessionPlayerId) {
      return
    }

    RequestValidationService.validateQuery(req.query, z.object({}))
    const body = RequestValidationService.validateBody(
      req.body,
      PlayerObject.pick({
        username: true,
      }),
    )
    const params = RequestValidationService.validateParams(
      req.params,
      PlayerObject.pick({ player_id: true }),
    )

    if (params.player_id !== sessionPlayerId) {
      res.status(403)
      res.end()
      return
    }

    const updatedPlayer = await PlayerModel.update(params.player_id, {
      username: body.username,
    })

    const updatedPlayerResponse =
      PlayerService.parsePlayerToResponse(updatedPlayer)

    if (body.username) {
      WebsocketService.emitToast(
        `${body.username} changed name to ${updatedPlayerResponse.username}`,
      )
    }

    // Emit an event to all connected clients to invalidate the players query
    WebsocketService.emitInvalidateQuery([QueryKeys.Players, QueryKeys.List])
    WebsocketService.emitInvalidateQuery(
      [QueryKeys.Players, QueryKeys.Detail],
      updatedPlayer.player_id,
    )

    res.json(updatedPlayerResponse)
  }
}
