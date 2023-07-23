import {
  ColumnProps,
  ColumnType,
} from "@app/components/atoms/Column/@types/Column"
import { mapColumnTypeToStyles } from "@app/components/atoms/Column/styles"

export const Column: React.FC<ColumnProps> = ({
  children,
  className = "",
  type = ColumnType.Default,
}) => (
  <div className={`${mapColumnTypeToStyles[type]} ${className}`}>
    {children}
  </div>
)
