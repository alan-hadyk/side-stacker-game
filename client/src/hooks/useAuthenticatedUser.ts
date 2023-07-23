import { Player } from "@app/@types/api"
import { useLocalStorage } from "usehooks-ts"

export const useAuthenticatedUser = () => {
  const [authenticatedUser, setAuthenticatedUser] = useLocalStorage<
    Player | undefined
  >("user", undefined)

  return {
    authenticatedUser,
    setAuthenticatedUser,
  }
}
