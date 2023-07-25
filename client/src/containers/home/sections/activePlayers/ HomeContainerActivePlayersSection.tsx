import {
  TypographyColor,
  TypographyVariant,
  TypographyWeight,
} from "@client/components/atoms/Typography/@types/Typography"
import { Typography } from "@client/components/atoms/Typography/Typography"
import { Card } from "@client/components/molecules/Card/Card"
import { Table } from "@client/components/organisms/Table/Table"
import { useGetPlayers } from "@client/hooks/queries/useGetPlayers"
import { useAuthenticatedUser } from "@client/hooks/useAuthenticatedUser"
import dayjs from "dayjs"

export const HomeContainerActivePlayersSection: React.FC = () => {
  const { isInitialLoading, players } = useGetPlayers({
    limit: 20,
  })

  const { authenticatedUser } = useAuthenticatedUser()

  const rows = players?.map(
    ({ last_active_at, username, player_id }, index) => [
      index + 1,
      <Typography
        variant={TypographyVariant.Span}
        color={
          player_id === authenticatedUser?.player_id
            ? TypographyColor.Primary
            : TypographyColor.Inherit
        }
        weight={TypographyWeight.Bold}
      >
        {username}
      </Typography>,
      dayjs(last_active_at).fromNow(),
    ],
  )

  return (
    <Card className="min-w-[320px]" title="Recent Players">
      <Table
        headers={["#", "Name", "Last Active"]}
        isLoading={isInitialLoading}
        rows={rows}
      />
    </Card>
  )
}
