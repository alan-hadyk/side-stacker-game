import { Hero } from "@client/components/atoms/Hero/Hero"
import { ErrorTemplateProps } from "@client/components/templates/ErrorTemplate/@types/ErrorTemplate"

export const ErrorTemplate: React.FC<ErrorTemplateProps> = ({ children }) => (
  <Hero>
    <div className="flex flex-col items-center gap-4">{children}</div>
  </Hero>
)
