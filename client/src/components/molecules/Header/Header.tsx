import { HeaderProps } from "@app/components/molecules/Header/@types/Header"
import { LogoSize } from "@app/components/molecules/Logo/@types/Logo"
import { Logo } from "@app/components/molecules/Logo/Logo"
import { homeRoute } from "@app/routing/routes"
import { Link } from "@tanstack/router"

export const Header: React.FC<HeaderProps> = ({ children }) => (
  <header className="bg-base-300 sticky top-0 left-0 right-0 w-full shadow-md">
    <div className="max-w-7xl p-4 mx-auto flex gap-4 items-center justify-between">
      <Link to={homeRoute.to}>
        <Logo
          className={{
            img: "hover:animate-spin-z-2",
          }}
          size={LogoSize.Sm}
        />
      </Link>

      <div className="flex items-center gap-2">{children}</div>
    </div>
  </header>
)