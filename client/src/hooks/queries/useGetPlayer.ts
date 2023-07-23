import { Player } from "@app/@types/api"
import { queryKeys } from "@app/api/queryKeys"
import { axiosGet } from "@app/helpers/api/axiosGet"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetPlayer = (
  params?: Pick<Player, "player_id">,
  options?: UseQueryOptions<Player, AxiosError, Player>,
) => {
  const useGetPlayerQuery = useQuery({
    enabled: Boolean(params?.player_id),
    queryFn: () => axiosGet<Player>(`/players/${params?.player_id || ""}`),
    queryKey: queryKeys.players.detail(params?.player_id),
    ...options,
  })

  const player = useGetPlayerQuery.data

  return {
    ...useGetPlayerQuery,
    player,
  }
}
