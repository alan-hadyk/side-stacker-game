import { ProgressVariant } from "@app/components/atoms/Progress/@types/Progress"
import { Progress } from "@app/components/atoms/Progress/Progress"
import { AlertType } from "@app/components/molecules/Alert/@types/Alert"
import { Alert } from "@app/components/molecules/Alert/Alert"
import { GamesCards } from "@app/components/molecules/GamesCards/GamesCards"
import { Section } from "@app/components/molecules/Section/Section"
import { useGetGames } from "@app/hooks/queries/useGetGames"
import { GameStateEnum } from "@server/@types/api"
import isEmpty from "lodash/isEmpty"
import { IconType } from "react-icons"
import { FiFrown } from "react-icons/fi"

export const HomeContainerOpenGamesSection: React.FC = () => {
  const { games: openGames, isInitialLoading } = useGetGames({
    filters: {
      current_game_state: GameStateEnum.waiting_for_players,
    },
    limit: 100,
  })

  return (
    <Section title="Open Games">
      {isInitialLoading && <Progress variant={ProgressVariant.Primary} />}

      {!isInitialLoading && !isEmpty(openGames) && openGames ? (
        <GamesCards games={openGames} />
      ) : (
        <Alert icon={FiFrown as IconType} type={AlertType.Primary}>
          There are no Open Games at the moment
        </Alert>
      )}
    </Section>
  )
}
