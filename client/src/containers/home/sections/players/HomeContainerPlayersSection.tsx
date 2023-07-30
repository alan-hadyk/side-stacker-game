import { useGetCurrentPlayer } from "@client/api/queries/useGetCurrentPlayer"
import { useGetPlayers } from "@client/api/queries/useGetPlayers"
import { AlertType } from "@client/components/molecules/Alert/@types/Alert"
import { Alert } from "@client/components/molecules/Alert/Alert"
import { Card } from "@client/components/molecules/Card/Card"
import { PaginationSize } from "@client/components/molecules/Pagination/@types/Pagination"
import { Pagination } from "@client/components/molecules/Pagination/Pagination"
import { Table } from "@client/components/organisms/Table/Table"
import { mapPlayersToRows } from "@client/containers/home/sections/players/helpers/mapPlayersToRows"
import { usePagination } from "@client/hooks/usePagination"
import isEmpty from "lodash/isEmpty"
import { IconType } from "react-icons"
import { FiUserX } from "react-icons/fi"

export const HomeContainerPlayersSection: React.FC = () => {
  const { limit, offset, setOffset } = usePagination({
    limit: 10,
  })
  const { isInitialLoading, players, total } = useGetPlayers({
    limit,
    offset,
  })

  const { currentPlayer } = useGetCurrentPlayer()
  const rows = mapPlayersToRows(currentPlayer?.player_id, players)

  return (
    <Card title="Players">
      {isInitialLoading || !isEmpty(rows) ? (
        <>
          <Table
            headers={["Name", "Last Active"]}
            isLoading={isInitialLoading}
            rows={rows}
          />

          {total && total > limit && (
            <Pagination
              limit={limit}
              offset={offset}
              onNextPage={() => setOffset((_offset) => _offset + limit)}
              onPreviousPage={() => setOffset((_offset) => _offset - limit)}
              size={PaginationSize.Sm}
              total={total}
            />
          )}
        </>
      ) : (
        <Alert icon={FiUserX as IconType} type={AlertType.Accent}>
          There are no active players
        </Alert>
      )}
    </Card>
  )
}
