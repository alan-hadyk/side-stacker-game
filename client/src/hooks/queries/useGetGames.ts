import { queryKeys } from "@app/api/queryKeys"
import { axiosGet } from "@app/helpers/api/axiosGet"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { GameResponse, GamesGetAllQueryParams } from "@server/@types/api"

export const useGetGames = (
  params?: GamesGetAllQueryParams,
  options?: UseQueryOptions<GameResponse[], AxiosError, GameResponse[]>,
) => {
  const useGetPlayerQuery = useQuery({
    queryFn: () => axiosGet<GameResponse[]>("/games", { params }),
    queryKey: queryKeys.games.list(params),
    ...options,
  })

  const games = useGetPlayerQuery.data

  return {
    ...useGetPlayerQuery,
    games,
  }
}
