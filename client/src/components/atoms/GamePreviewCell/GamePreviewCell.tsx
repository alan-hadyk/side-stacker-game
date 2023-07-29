import { OIcon } from "@client/assets/icons/OIcon"
import { XIcon } from "@client/assets/icons/XIcon"
import { GamePreviewCellProps } from "@client/components/atoms/GamePreviewCell/@types/GamePreviewCell"

export const GamePreviewCell: React.FC<GamePreviewCellProps> = ({ cell }) => (
  <div
    className={`
        flex items-center justify-center 
        border-r-1 last:border-r-0 border-base-300
        w-4 h-4
      `}
  >
    {cell === "X" && (
      <XIcon className="block w-3 h-3 text-primary" fill="currentColor" />
    )}
    {cell === "O" && (
      <OIcon className="block w-3 h-3 text-secondary" fill="currentColor" />
    )}
  </div>
)
