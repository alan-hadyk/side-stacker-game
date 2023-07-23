import { AlertType } from "@app/components/molecules/Alert/@types/Alert"
import { Alert } from "@app/components/molecules/Alert/Alert"
import { Section } from "@app/components/molecules/Section/Section"
import { useGetGames } from "@app/hooks/queries/useGetGames"
import { GameStateEnum } from "@server/@types/api"
import isEmpty from "lodash/isEmpty"
import { IconType } from "react-icons"
import { FiFrown } from "react-icons/fi"

export const HomeContainerOpenGamesSection: React.FC = () => {
  const { games: openGames, isInitialLoading: isInitialLoadingOpenGames } =
    useGetGames({
      filters: {
        current_game_state: GameStateEnum.waiting_for_players,
      },
      limit: 100,
    })

  console.log({ openGames })

  return (
    <Section title="Open Games">
      {isInitialLoadingOpenGames && (
        <progress className="progress progress-primary w-full"></progress>
      )}

      {!isInitialLoadingOpenGames && !isEmpty(openGames) ? (
        <div>Games</div>
      ) : (
        <Alert icon={FiFrown as IconType} type={AlertType.Primary}>
          There are no Open Games at the moment
        </Alert>
      )}
    </Section>
  )
}
