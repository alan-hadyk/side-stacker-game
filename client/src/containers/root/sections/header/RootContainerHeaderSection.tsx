import { Button } from "@app/components/atoms/Button/Button"
import {
  TypographyAlignment,
  TypographyVariant,
} from "@app/components/atoms/Typography/@types/Typography"
import { Typography } from "@app/components/atoms/Typography/Typography"
import { Dropdown } from "@app/components/molecules/Dropdown/Dropdown"
import { Header } from "@app/components/molecules/Header/Header"
import { useAuthenticatedUser } from "@app/hooks/useAuthenticatedUser"

export const RootContainerHeaderSection: React.FC = () => {
  const { authenticatedUser } = useAuthenticatedUser()

  return (
    <Header>
      <Button>New Game</Button>
      <Dropdown
        items={[
          {
            onClick: () => false,
            text: "Quit Application",
          },
        ]}
      >
        <Typography
          alignment={TypographyAlignment.Center}
          variant={TypographyVariant.Callout}
        >
          {authenticatedUser?.username}
        </Typography>
      </Dropdown>
    </Header>
  )
}
