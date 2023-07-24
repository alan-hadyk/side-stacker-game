import { QueryKeys } from "@app/@types/api"

export interface InvalidateQueryPayload {
  entity: QueryKeys[]
  id?: string | number
}
export interface ServerToClientEvents {
  invalidateQuery: (queryKeys: InvalidateQueryPayload) => void
}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {}
