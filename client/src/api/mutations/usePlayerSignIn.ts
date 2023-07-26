import { axiosPost } from "@client/helpers/api/axiosPost"
import { getAxiosError } from "@client/helpers/api/getAxiosError"
import { useToast } from "@client/hooks/useToast"
import { PlayerResponse } from "@server/@types/api"
import { MutateOptions, useMutation } from "@tanstack/react-query"

export const usePlayerSignIn = () => {
  const { mutate, ...playerSignInMutation } = useMutation({
    mutationFn: (
      body: Pick<PlayerResponse, "username"> & { password: string },
    ) => axiosPost<PlayerResponse>("/players/sign-in", body),
  })
  const { errorToast } = useToast()

  const playerSignIn = (
    body: Pick<PlayerResponse, "username"> & { password: string },
    options?: MutateOptions<
      PlayerResponse,
      unknown,
      Pick<PlayerResponse, "username">,
      unknown
    >,
  ) =>
    mutate(body, {
      onError: (error) => {
        const apiError = getAxiosError(error)

        if (apiError) {
          apiError.errors.forEach((message) => {
            errorToast(message)
          })
        }
      },
      ...options,
    })

  return {
    ...playerSignInMutation,
    playerSignIn,
  }
}
