import { ReactNode } from "react"

export enum ColumnType {
  Auto,
  Default,
  Grow,
  Shrink,
}

export interface ColumnProps {
  children: ReactNode | ReactNode[]
  className?: string
  type?: ColumnType
}
