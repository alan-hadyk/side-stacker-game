import { ButtonVariant } from "@client/components/atoms/Button/@types/Button"
import { Button } from "@client/components/atoms/Button/Button"
import { PaginationProps } from "@client/components/molecules/Pagination/@types/Pagination"

export const Pagination: React.FC<PaginationProps> = ({
  limit,
  offset,
  onNextPage,
  onPreviousPage,
  total,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="join">
        <Button
          className="join-item"
          disabled={offset === 0}
          onClick={onPreviousPage}
          variant={ButtonVariant.Default}
        >
          «
        </Button>
        <Button
          className="join-item hover:bg-base-200 hover:border-base-200 cursor-default"
          variant={ButtonVariant.Default}
        >
          Page {offset / limit + 1}
        </Button>
        <Button
          className="join-item"
          disabled={offset + limit >= total}
          onClick={onNextPage}
          variant={ButtonVariant.Default}
        >
          »
        </Button>
      </div>
    </div>
  )
}
