import { ColumnType } from "@app/components/atoms/Column/@types/Column"
import { Column } from "@app/components/atoms/Column/Column"
import { PageTemplate } from "@app/components/templates/PageTemplate/PageTemplate"
import { HomeContainerStatsSection } from "@app/containers/home/sections/stats/HomeContainerStatsSection"

export const HomeContainer: React.FC = () => (
  <PageTemplate>
    <Column type={ColumnType.Auto}>
      <HomeContainerStatsSection />
    </Column>
    <Column>Sidebar</Column>
  </PageTemplate>
)
