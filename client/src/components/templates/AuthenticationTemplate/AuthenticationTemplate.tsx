import { Hero } from "@client/components/atoms/Hero/Hero"
import { Logo } from "@client/components/molecules/Logo/Logo"
import { AuthenticationTemplateProps } from "@client/components/templates/AuthenticationTemplate/@types/AuthenticationTemplate"

export const AuthenticationTemplate: React.FC<AuthenticationTemplateProps> = ({
  children,
}) => (
  <Hero>
    <div className="flex flex-col gap-4">
      <Logo />
      {children}
    </div>
  </Hero>
)
