import { QueryKeys } from "@app/@types/api"
import { websocketsServer } from "@app/clients/websocketsServer"

export class WebsocketService {
  static emitInvalidateQuery = (entity: QueryKeys[], id?: string): void => {
    websocketsServer.emit("invalidateQuery", id ? { entity, id } : { entity })
  }
}
