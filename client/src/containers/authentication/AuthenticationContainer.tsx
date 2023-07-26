import { AuthenticationFormValues } from "@client/components/organisms/AuthenticationForm/@types/AuthenticationForm"
import { AuthenticationForm } from "@client/components/organisms/AuthenticationForm/AuthenticationForm"
import { useCreatePlayer } from "@client/api/mutations/useCreatePlayer"
import { useQueryClient } from "@tanstack/react-query"
import { PlayerResponse, QueryKeys } from "@server/@types/api"
import { AuthenticationTemplate } from "@client/components/templates/AuthenticationTemplate/AuthenticationTemplate"
import { usePlayerSignIn } from "@client/api/mutations/usePlayerSignIn"

export const AuthenticationContainer: React.FC = () => {
  const { createPlayer, isLoading: isCreatingPlayer } = useCreatePlayer()
  const { playerSignIn, isLoading: isSigningIn } = usePlayerSignIn()
  const queryClient = useQueryClient()

  const onSuccess = (player: PlayerResponse) => {
    queryClient.setQueriesData([QueryKeys.Players, QueryKeys.Current], player)
  }

  const handleSignIn = (data: AuthenticationFormValues) => {
    playerSignIn(data, {
      onSuccess,
    })
  }

  const handleCreatePlayer = (data: AuthenticationFormValues) => {
    createPlayer(data, {
      onSuccess,
    })
  }

  return (
    <AuthenticationTemplate>
      <AuthenticationForm isLoading={isSigningIn} onSubmit={handleSignIn} />
      <div className="divider">OR</div>
      <AuthenticationForm
        buttonText="Create Account"
        isLoading={isCreatingPlayer}
        onSubmit={handleCreatePlayer}
        title="Sign Up"
      />
    </AuthenticationTemplate>
  )
}
