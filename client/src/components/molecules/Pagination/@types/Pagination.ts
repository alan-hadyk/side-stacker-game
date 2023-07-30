export interface PaginationProps {
  limit: number
  offset: number
  onNextPage?: () => void
  onPreviousPage?: () => void
  total: number
}
