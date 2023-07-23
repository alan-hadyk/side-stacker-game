import { Player } from "@app/@types/api"
import { axiosPost } from "@app/helpers/api/axiosPost"
import { getAxiosErrorMessage } from "@app/helpers/api/getAxiosErrorMessage"
import { MutateOptions, useMutation } from "@tanstack/react-query"

export const useCreatePlayer = () => {
  const { mutate, ...createPlayerMutation } = useMutation({
    mutationFn: (body: Pick<Player, "username">) =>
      axiosPost<Player>("/players", body),
  })

  const createPlayer = (
    body: Pick<Player, "username">,
    options?: MutateOptions<Player, unknown, Pick<Player, "username">, unknown>,
  ) =>
    mutate(body, {
      onError: (error) => {
        const errorMessage = getAxiosErrorMessage(error)

        if (errorMessage) {
          console.error(errorMessage)
          //   errorToast({
          //     message: errorMessage,
          //     title: "Error",
          //   })
        }
      },
      ...options,
    })

  return {
    ...createPlayerMutation,
    createPlayer,
  }
}
