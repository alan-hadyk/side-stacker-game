import { Path } from "@app/@enums/paths"
import {
  ButtonFill,
  ButtonVariant,
} from "@app/components/atoms/Button/@types/Button"
import { Button } from "@app/components/atoms/Button/Button"
import { Header } from "@app/components/molecules/Header/Header"
import { useAuthenticatedUser } from "@app/hooks/useAuthenticatedUser"
import { useRouterContext } from "@tanstack/router"
import { ReactNode } from "react"

export const RootContainerHeaderSection: React.FC = () => {
  const routerContext = useRouterContext()
  const { authenticatedUser } = useAuthenticatedUser()

  const headerButtons: ReactNode[] = [
    <Button fill={ButtonFill.Outline} variant={ButtonVariant.Error}>
      Quit Application
    </Button>,
  ]

  switch (routerContext.state.currentLocation.pathname) {
    case Path.Home:
      headerButtons.unshift(<Button>New Game</Button>)
      break
  }

  return <Header username={authenticatedUser?.username}>{headerButtons}</Header>
}
