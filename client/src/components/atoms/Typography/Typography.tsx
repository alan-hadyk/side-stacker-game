import {
  TypographyAlignment,
  TypographyProps,
  TypographyVariant,
} from "@app/components/atoms/Typography/@types/Typography"

export const Typography: React.FC<TypographyProps> = ({
  alignment = TypographyAlignment.Left,
  children,
  className = "",
  variant,
}) => {
  switch (variant) {
    case TypographyVariant.Title:
      return (
        <h1 className={`text-5xl font-bold ${alignment} ${className}`}>
          {children}
        </h1>
      )

    case TypographyVariant.Callout:
      return <p className={`text-xl ${alignment} ${className}`}>{children}</p>

    case TypographyVariant.Subtitle:
      return (
        <h2 className={`text-2xl font-bold ${alignment} ${className}`}>
          {children}
        </h2>
      )
  }
}
