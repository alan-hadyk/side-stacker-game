import { useGetGames } from "@client/api/queries/useGetGames"
import { AlertType } from "@client/components/molecules/Alert/@types/Alert"
import { Alert } from "@client/components/molecules/Alert/Alert"
import { GamesCards } from "@client/components/molecules/GamesCards/GamesCards"
import { Pagination } from "@client/components/molecules/Pagination/Pagination"
import { Section } from "@client/components/molecules/Section/Section"
import { usePagination } from "@client/hooks/usePagination"
import { GameStateEnum } from "@server/@types/api"
import isEmpty from "lodash/isEmpty"
import { IconType } from "react-icons"
import { FiAlertCircle, FiFrown } from "react-icons/fi"

/**
 * Section component for the games in progress in the home page. It displays the games in progress and handles pagination.
 */
export const HomeContainerGamesInProgressSection: React.FC = () => {
  const { limit, offset, setOffset } = usePagination()

  const {
    error,
    games: gamesInProgress,
    isInitialLoading,
    total,
  } = useGetGames(
    {
      filters: [
        {
          conditions: {
            current_game_state: GameStateEnum.in_progress,
          },
        },
      ],
      limit,
      offset,
    },
    {
      keepPreviousData: true,
    },
  )

  return (
    <Section title="Games In Progress">
      {!isEmpty(gamesInProgress) || isInitialLoading ? (
        <>
          <GamesCards games={gamesInProgress} isLoading={isInitialLoading} />

          {total && total > limit && (
            <Pagination
              limit={limit}
              offset={offset}
              onNextPage={() => setOffset((_offset) => _offset + limit)}
              onPreviousPage={() => setOffset((_offset) => _offset - limit)}
              total={total}
            />
          )}
        </>
      ) : (
        <>
          {error ? (
            <Alert icon={FiAlertCircle as IconType} type={AlertType.Error}>
              It seems that there's a problem with the service. Please try again
              later.
            </Alert>
          ) : (
            <Alert icon={FiFrown as IconType} type={AlertType.Secondary}>
              There are no Games In Progress at the moment
            </Alert>
          )}
        </>
      )}
    </Section>
  )
}
