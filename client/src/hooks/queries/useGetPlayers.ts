import { queryKeys } from "@app/api/queryKeys"
import { axiosGet } from "@app/helpers/api/axiosGet"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PlayerResponse, PlayersGetAllQueryParams } from "@server/@types/api"

export const useGetPlayers = (
  params?: PlayersGetAllQueryParams,
  options?: UseQueryOptions<PlayerResponse[], AxiosError, PlayerResponse[]>,
) => {
  const useGetPlayersQuery = useQuery({
    queryFn: () => axiosGet<PlayerResponse[]>("/players", { params }),
    queryKey: queryKeys.players.list(params),
    ...options,
  })

  const players = useGetPlayersQuery.data

  return {
    ...useGetPlayersQuery,
    players,
  }
}
