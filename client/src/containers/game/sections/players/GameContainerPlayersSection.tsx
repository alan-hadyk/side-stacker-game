import { Card } from "@client/components/molecules/Card/Card"
import { GamePlayerRowType } from "@client/components/molecules/GamePlayerRow/@types/GamePlayerRow"
import { GamePlayerRow } from "@client/components/molecules/GamePlayerRow/GamePlayerRow"
import { Table } from "@client/components/organisms/Table/Table"
import { useGameContainerQueries } from "@client/containers/game/hooks/useGameContainerQueries"
import { usePlayersSectionActions } from "@client/containers/game/sections/players/hooks/usePlayersSectionActions"

export const GameContainerPlayersSection: React.FC = () => {
  const {
    hasPlayer1NextMove,
    hasPlayer2NextMove,
    isCurrentUserPlayer1,
    isCurrentUserPlayer2,
    isInitialLoading,
    player1,
    player2,
  } = useGameContainerQueries()

  const {
    isUpdatingGame,
    joinAsPlayer1,
    joinAsPlayer2,
    leaveAsPlayer1,
    leaveAsPlayer2,
  } = usePlayersSectionActions()

  const rows = [
    GamePlayerRow({
      hasNextMove: hasPlayer1NextMove,
      isCurrentUser: isCurrentUserPlayer1,
      isDisabled: isUpdatingGame,
      onJoin: joinAsPlayer1,
      onLeave: leaveAsPlayer1,
      player: player1,
      type: GamePlayerRowType.Player1,
    }),
    GamePlayerRow({
      hasNextMove: hasPlayer2NextMove,
      isCurrentUser: isCurrentUserPlayer2,
      isDisabled: isUpdatingGame,
      onJoin: joinAsPlayer2,
      onLeave: leaveAsPlayer2,
      player: player2,
      type: GamePlayerRowType.Player2,
    }),
  ]

  return (
    <Card title="Players">
      <Table
        headers={[" ", "Name", "Action"]}
        isLoading={isInitialLoading}
        loaderRows={2}
        rows={rows}
      />
    </Card>
  )
}