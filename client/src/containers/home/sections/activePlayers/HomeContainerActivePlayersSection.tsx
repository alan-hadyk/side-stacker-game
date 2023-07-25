import { useGetPlayers } from "@client/api/queries/useGetPlayers"
import {
  TypographyVariant,
  TypographyWeight,
} from "@client/components/atoms/Typography/@types/Typography"
import { Typography } from "@client/components/atoms/Typography/Typography"
import { AlertType } from "@client/components/molecules/Alert/@types/Alert"
import { Alert } from "@client/components/molecules/Alert/Alert"
import { Card } from "@client/components/molecules/Card/Card"
import { Table } from "@client/components/organisms/Table/Table"
import { useAuthenticatedUser } from "@client/hooks/useAuthenticatedUser"
import { PlayerResponse } from "@server/@types/api"
import dayjs from "dayjs"
import isEmpty from "lodash/isEmpty"
import { IconType } from "react-icons"
import { FiUserX } from "react-icons/fi"

export const HomeContainerActivePlayersSection: React.FC = () => {
  const { isInitialLoading, players } = useGetPlayers({
    limit: 20,
  })

  const { authenticatedUser } = useAuthenticatedUser()
  const isAuthenticatedUser = (player_id: PlayerResponse["player_id"]) =>
    player_id === authenticatedUser?.player_id

  const rows = players?.map(
    ({ last_active_at, username, player_id }, index) => [
      index + 1,
      <Typography
        variant={TypographyVariant.Span}
        weight={
          isAuthenticatedUser(player_id)
            ? TypographyWeight.Bold
            : TypographyWeight.Normal
        }
      >
        {username} {isAuthenticatedUser(player_id) && "(you)"}
      </Typography>,
      dayjs(last_active_at).fromNow(),
    ],
  )

  return (
    <Card className="min-w-[320px]" title="Active Players">
      {isInitialLoading || !isEmpty(rows) ? (
        <Table
          headers={["#", "Name", "Last Active"]}
          isLoading={isInitialLoading}
          rows={rows}
        />
      ) : (
        <Alert icon={FiUserX as IconType} type={AlertType.Accent}>
          There are no active players
        </Alert>
      )}
    </Card>
  )
}
