import { TypographyVariant } from "@app/components/atoms/Typography/@types/Typography"
import { Typography } from "@app/components/atoms/Typography/Typography"
import { SectionProps } from "@app/components/molecules/Section/@types/Section"

export const Section: React.FC<SectionProps> = ({ children, title }) => (
  <div className="my-12">
    <div className="divider">
      {" "}
      <Typography variant={TypographyVariant.Subtitle}>{title}</Typography>
    </div>

    {children}
  </div>
)
