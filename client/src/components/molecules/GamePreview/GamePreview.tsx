import { GamePreviewCell } from "@app/components/atoms/GamePreviewCell/GamePreviewCell"
import { GamePreviewRow } from "@app/components/atoms/GamePreviewRow/GamePreviewRow"
import { GamePreviewProps } from "@app/components/molecules/GamePreview/@types/GamePreview"

export const GamePreview: React.FC<GamePreviewProps> = ({ boardStatus }) => (
  <div className="flex items-center justify-center flex-col my-4 border-1 border-base-300 bg-white rounded-md">
    {boardStatus.map((row, rowIndex) => (
      <GamePreviewRow key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <GamePreviewCell cell={cell} key={cellIndex} />
        ))}
      </GamePreviewRow>
    ))}
  </div>
)
