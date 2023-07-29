import { BadgeType } from "@client/components/atoms/Badge/@types/Badge"
import { Badge } from "@client/components/atoms/Badge/Badge"
import { TypographyVariant } from "@client/components/atoms/Typography/@types/Typography"
import { Typography } from "@client/components/atoms/Typography/Typography"
import { Card } from "@client/components/molecules/Card/Card"
import { GameInfoCardProps } from "@client/components/molecules/GameInfoCard/@types/GameInfoCard"
import { mapCurrentGameStateToBadgeProps } from "@client/components/molecules/GameInfoCard/helpers/mapCurrentGameStateToBadgeProps"
import { commonLoaderClassNames } from "@client/components/molecules/GameInfoCard/styles"

export const GameInfoCard: React.FC<GameInfoCardProps> = ({
  game,
  isLoading,
}) => {
  const gameStateBadgeProps =
    game && mapCurrentGameStateToBadgeProps[game.current_game_state]

  return (
    <Card isLoading={isLoading} title={game?.name}>
      {isLoading ? (
        <>
          <Badge
            className={`w-[140px] h-[20px] ${commonLoaderClassNames} from-primary to-secondary`}
            children=" "
            type={BadgeType.Default}
          />
          <Badge
            className={`w-[140px] h-[20px] ${commonLoaderClassNames} from-info to-success`}
            children=" "
            type={BadgeType.Default}
          />
        </>
      ) : (
        <>
          {gameStateBadgeProps && (
            <Badge type={gameStateBadgeProps.type}>
              {gameStateBadgeProps.text}
            </Badge>
          )}
          <Typography variant={TypographyVariant.Paragraph}>
            <strong>{game?.number_of_moves}</strong> moves made so far
          </Typography>
        </>
      )}
    </Card>
  )
}