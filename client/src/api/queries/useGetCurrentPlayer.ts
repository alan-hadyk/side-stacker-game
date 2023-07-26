import { queryKeys } from "@client/api/queryKeys"
import { axiosGet } from "@client/helpers/api/axiosGet"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PlayerResponse } from "@server/@types/api"

export const useGetCurrentPlayer = (
  options?: UseQueryOptions<PlayerResponse, AxiosError, PlayerResponse>,
) => {
  const getCurrentPlayerQuery = useQuery({
    queryFn: () => axiosGet<PlayerResponse>("/players/current"),
    queryKey: queryKeys.players.current,
    ...options,
  })

  const currentPlayer = getCurrentPlayerQuery.data

  return {
    ...getCurrentPlayerQuery,
    currentPlayer,
  }
}
