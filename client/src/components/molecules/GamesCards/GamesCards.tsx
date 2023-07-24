import { GameCard } from "@app/components/molecules/GameCard/GameCard"
import { GamesCardsProps } from "@app/components/molecules/GamesCards/@types/GamesCards"

export const GamesCards: React.FC<GamesCardsProps> = ({ games }) => (
  <div className="flex items-start justify-start gap-4 flex-wrap">
    {games.map((game) => (
      <GameCard className="w-[calc(25%-12px)]" key={game.game_id} game={game} />
    ))}
  </div>
)
