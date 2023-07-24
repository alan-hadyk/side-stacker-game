import {
  TypographyColor,
  TypographyVariant,
  TypographyWeight,
} from "@app/components/atoms/Typography/@types/Typography"
import { Typography } from "@app/components/atoms/Typography/Typography"
import { Card } from "@app/components/molecules/Card/Card"
import { Table } from "@app/components/organisms/Table/Table"
import { useGetPlayers } from "@app/hooks/queries/useGetPlayers"
import { useAuthenticatedUser } from "@app/hooks/useAuthenticatedUser"
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
        // className="min-w-80"
        headers={["#", "Name", "Last Active"]}
        isLoading={isInitialLoading}
        rows={rows}
      />
    </Card>
  )
}
