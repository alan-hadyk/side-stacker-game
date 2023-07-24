import { Typography } from "@app/components/atoms/Typography/Typography"
import logo from "@app/assets/images/logo.svg"
import { Img } from "@app/components/atoms/Img/Img"
import { TypographyVariant } from "@app/components/atoms/Typography/@types/Typography"
import { LogoProps, LogoSize } from "@app/components/molecules/Logo/@types/Logo"

export const Logo: React.FC<LogoProps> = ({
  className,
  size = LogoSize.Lg,
}) => {
  switch (size) {
    case LogoSize.Sm:
      return (
        <div className="flex items-center gap-2 group">
          <Img
            alt="Side-Stacker logo"
            className={`w-12 h-12 drop-shadow-md ${className?.img || ""}`}
            src={logo}
          />
          <Typography variant={TypographyVariant.Subtitle}>
            Side-Stacker
          </Typography>
        </div>
      )

    case LogoSize.Lg:
      return (
        <>
          <Img
            alt="Side-Stacker logo"
            className={`w-28 h-28 mx-auto mb-4 animate-spin-y-8 drop-shadow-lg ${
              className?.img || ""
            }`}
            src={logo}
          />
          <Typography variant={TypographyVariant.Title}>
            Side-Stacker
          </Typography>
        </>
      )
  }
}
