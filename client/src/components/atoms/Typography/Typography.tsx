import {
  TypographyAlignment,
  TypographyColor,
  TypographyProps,
  TypographyVariant,
  TypographyWeight,
} from "@app/components/atoms/Typography/@types/Typography"

export const Typography: React.FC<TypographyProps> = ({
  alignment = TypographyAlignment.Left,
  children,
  color = TypographyColor.Inherit,
  className = "",
  variant,
  weight,
}) => {
  const commonClassNames = [alignment, color, className]

  switch (variant) {
    case TypographyVariant.Title:
      return (
        <h1
          className={`text-5xl ${
            weight || TypographyWeight.Bold
          } ${commonClassNames.join(" ")}`}
        >
          {children}
        </h1>
      )

    case TypographyVariant.Callout:
      return (
        <p className={`text-xl ${commonClassNames.join(" ")}`}>{children}</p>
      )

    case TypographyVariant.Subtitle:
      return (
        <h2
          className={`text-2xl ${
            weight || TypographyWeight.Bold
          } ${commonClassNames.join(" ")}`}
        >
          {children}
        </h2>
      )

    case TypographyVariant.Span:
      return (
        <span
          className={`${
            weight || TypographyWeight.Normal
          } ${commonClassNames.join(" ")}`}
        >
          {children}
        </span>
      )
  }
}
