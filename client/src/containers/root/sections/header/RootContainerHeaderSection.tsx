import { useGetCurrentPlayer } from "@client/api/queries/useGetCurrentPlayer"
import { Button } from "@client/components/atoms/Button/Button"
import {
  TypographyAlignment,
  TypographyVariant,
} from "@client/components/atoms/Typography/@types/Typography"
import { Typography } from "@client/components/atoms/Typography/Typography"
import { Dropdown } from "@client/components/molecules/Dropdown/Dropdown"
import { Header } from "@client/components/organisms/Header/Header"

export const RootContainerHeaderSection: React.FC = () => {
  const { currentPlayer } = useGetCurrentPlayer()

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
          Hi, <strong>{currentPlayer?.username || "user"}</strong>
        </Typography>
      </Dropdown>
    </Header>
  )
}
