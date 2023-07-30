import { useState } from "react"

export const usePagination = (
  { limit } = {
    limit: 4,
  },
) => {
  const _limit = limit
  const [offset, setOffset] = useState(0)

  return {
    limit: _limit,
    offset,
    setOffset,
  }
}
