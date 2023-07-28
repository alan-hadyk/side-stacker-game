import { useGetGame } from "@client/api/queries/useGetGame"
import { PageTemplate } from "@client/components/templates/PageTemplate/PageTemplate"
import { useParams } from "@tanstack/router"

export const GameContainer: React.FC = () => {
  const { game_id } = useParams()

  const { game, isInitialLoading } = useGetGame({ game_id })

  if (isInitialLoading) {
    return <>Loading..</>
  }

  if ((!isInitialLoading && !game) || !game) {
    return <>Game not found</>
  }

  return (
    <PageTemplate>
      <h1>Game</h1>
      <p>Name: {game.name}</p>
      <p>current_board_status: {JSON.stringify(game.current_board_status)}</p>
      <p>current_game_state: {JSON.stringify(game.current_game_state)}</p>
      <p>player1_id: {game.player1_id}</p>
      <p>player2_id: {game.player2_id}</p>
    </PageTemplate>
  )
}
