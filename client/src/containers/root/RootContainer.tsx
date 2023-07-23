import { LoginContainer } from "@app/containers/login/LoginContainer"
import { useAuthenticatedUser } from "@app/hooks/useAuthenticatedUser"
import { Outlet } from "@tanstack/router"

export const RootContainer: React.FC = () => {
  const { authenticatedUser } = useAuthenticatedUser()

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
