import { ProgressVariant } from "@app/components/atoms/Progress/@types/Progress"
import { Progress } from "@app/components/atoms/Progress/Progress"
import { AlertType } from "@app/components/molecules/Alert/@types/Alert"
import { Alert } from "@app/components/molecules/Alert/Alert"
import { Section } from "@app/components/molecules/Section/Section"
import { useGetGames } from "@app/hooks/queries/useGetGames"
import { GameStateEnum } from "@server/@types/api"
import isEmpty from "lodash/isEmpty"
import { IconType } from "react-icons"
import { FiFrown } from "react-icons/fi"

export const HomeContainerGamesInProgressSection: React.FC = () => {
  const { games: gamesInProgress, isInitialLoading } = useGetGames({
    filters: {
      current_game_state: GameStateEnum.in_progress,
    },
    limit: 100,
  })

  return (
    <Section title="Games In Progress">
      {isInitialLoading && <Progress variant={ProgressVariant.Secondary} />}

      {!isInitialLoading && !isEmpty(gamesInProgress) ? (
        <div>Games</div>
      ) : (
        <Alert icon={FiFrown as IconType} type={AlertType.Secondary}>
          There are no Games In Progress at the moment
        </Alert>
      )}
    </Section>
  )
}
