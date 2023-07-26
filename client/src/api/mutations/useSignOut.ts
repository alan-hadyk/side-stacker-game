import { axiosPost } from "@client/helpers/api/axiosPost"
import { getAxiosError } from "@client/helpers/api/getAxiosError"
import { useToast } from "@client/hooks/useToast"
import { MutateOptions, useMutation } from "@tanstack/react-query"

export const useSignOut = () => {
  const { mutate, ...signOutMutation } = useMutation({
    mutationFn: () => axiosPost("/sign-out"),
  })
  const { errorToast } = useToast()

  const signOut = (
    options?: MutateOptions<unknown, unknown, unknown, unknown>,
  ) =>
    mutate(undefined, {
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
    ...signOutMutation,
    signOut,
  }
}
