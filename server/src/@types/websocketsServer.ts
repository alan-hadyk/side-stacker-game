export interface InvalidateQueryPayload {
  entity: string[]
  id?: string | number
}
export interface ServerToClientEvents {
  invalidateQuery: (queryKeys: InvalidateQueryPayload) => void
}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {}
