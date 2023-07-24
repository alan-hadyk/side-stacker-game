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

export const HomeContainerFinishedGamesSection: React.FC = () => {
  const { games: finishedGames, isInitialLoading } = useGetGames({
    filters: {
      current_game_state: GameStateEnum.finished,
    },
    limit: 100,
  })

  return (
    <Section title="Finished Games">
      {isInitialLoading && <Progress variant={ProgressVariant.Accent} />}

      {!isInitialLoading && !isEmpty(finishedGames) ? (
        <div>Games</div>
      ) : (
        <Alert icon={FiFrown as IconType} type={AlertType.Accent}>
          There are no Finished Games at the moment
        </Alert>
      )}
    </Section>
  )
}
