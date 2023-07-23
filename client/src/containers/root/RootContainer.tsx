import { FullScreenLoader } from "@app/components/atoms/FullScreenLoader/FullScreenLoader"
import { LoginContainer } from "@app/containers/login/LoginContainer"
import { useGetPlayer } from "@app/hooks/queries/useGetPlayer"
import { useAuthenticatedUser } from "@app/hooks/useAuthenticatedUser"
import { useWebsockets } from "@app/hooks/useWebsockets"
import { Outlet } from "@tanstack/router"

export const RootContainer: React.FC = () => {
  useWebsockets()

  const { authenticatedUser, setAuthenticatedUser } = useAuthenticatedUser()
  const { isInitialLoading } = useGetPlayer(authenticatedUser, {
    onError: () => {
      setAuthenticatedUser(undefined)
    },
    onSuccess: (player) => {
      setAuthenticatedUser(player)
    },
  })

  if (isInitialLoading) {
    return <FullScreenLoader />
  }

  if (!authenticatedUser) {
    return <LoginContainer />
  }

  return (
    <div>
      <h1>My App</h1>
      <Outlet /> {/* This is where child routes will render */}
    </div>
  )
}
