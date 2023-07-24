import { LoginFormValues } from "@app/components/organisms/LoginForm/@types/LoginForm"
import { LoginForm } from "@app/components/organisms/LoginForm/LoginForm"
import { useCreatePlayer } from "@app/hooks/mutations/useCreatePlayer"
import { useAuthenticatedUser } from "@app/hooks/useAuthenticatedUser"

export const LoginContainer: React.FC = () => {
  const { createPlayer, isLoading } = useCreatePlayer()
  const { setAuthenticatedUser } = useAuthenticatedUser()

  const handleSubmit = (data: LoginFormValues) => {
    createPlayer(data, {
      onSuccess: (player) => {
        setAuthenticatedUser(player)
      },
    })
  }

  return <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
}
