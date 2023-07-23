import { ColumnType } from "@app/components/atoms/Column/@types/Column"

export const mapColumnTypeToStyles: Record<ColumnType, string> = {
  [ColumnType.Auto]: "flex-auto",
  [ColumnType.Default]: "",
  [ColumnType.Grow]: "flex-grow",
  [ColumnType.Shrink]: "flex-shrink",
}
