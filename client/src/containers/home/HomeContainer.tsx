import { ColumnType } from "@app/components/atoms/Column/@types/Column"
import { Column } from "@app/components/atoms/Column/Column"
import { PageTemplate } from "@app/components/templates/PageTemplate/PageTemplate"
import { HomeContainerActivePlayersSection } from "@app/containers/home/sections/activePlayers/ HomeContainerActivePlayersSection"
import { HomeContainerFinishedGamesSection } from "@app/containers/home/sections/finishedGames/HomeContainerFinishedGamesSection"
import { HomeContainerGamesInProgressSection } from "@app/containers/home/sections/gamesInProgress/HomeContainerGamesInProgressSection"
import { HomeContainerOpenGamesSection } from "@app/containers/home/sections/openGames/HomeContainerOpenGamesSection"
import { HomeContainerStatsSection } from "@app/containers/home/sections/stats/HomeContainerStatsSection"

export const HomeContainer: React.FC = () => (
  <PageTemplate>
    <Column type={ColumnType.Auto}>
      <HomeContainerStatsSection />
      <HomeContainerOpenGamesSection />
      <HomeContainerGamesInProgressSection />
      <HomeContainerFinishedGamesSection />
    </Column>
    <Column>
      <HomeContainerActivePlayersSection />
    </Column>
  </PageTemplate>
)
