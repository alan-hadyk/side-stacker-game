import { queryKeys } from "@client/api/queryKeys"
import { axiosGet } from "@client/helpers/api/axiosGet"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { GameResponse, GamesGetAllQueryParams } from "@server/@types/api"
import { useToast } from "@client/hooks/useToast"
import { getAxiosError } from "@client/helpers/api/getAxiosError"
import { Path } from "@server/routes/paths"

export const useGetGames = (
  params?: GamesGetAllQueryParams,
  options?: UseQueryOptions<GameResponse[], AxiosError, GameResponse[]>,
) => {
  const { errorToast } = useToast()

  const getGamesQuery = useQuery({
    onError: (error) => {
      const apiError = getAxiosError(error)

      if (apiError) {
        apiError.errors.forEach((message) => {
          errorToast(message)
        })
      }
    },
    queryFn: () => axiosGet<GameResponse[]>(Path.Games, { params }),
    queryKey: queryKeys.games.list(params),
    ...options,
  })

  const games = getGamesQuery.data

  return {
    ...getGamesQuery,
    games,
  }
}