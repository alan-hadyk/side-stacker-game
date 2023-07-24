import { ReactNode } from "react"

export interface TableProps {
  className?: string
  headers: ReactNode[]
  isLoading?: boolean
  rows?: ReactNode[][]
}
