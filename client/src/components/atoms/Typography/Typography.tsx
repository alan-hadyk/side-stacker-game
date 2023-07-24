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
  const weightDefaultBold = weight || TypographyWeight.Bold
  const weightDefaultNormal = weight || TypographyWeight.Normal

  switch (variant) {
    case TypographyVariant.Title:
      return (
        <h1
          className={`text-5xl ${weightDefaultBold} ${commonClassNames.join(
            " ",
          )}`}
        >
          {children}
        </h1>
      )

    case TypographyVariant.Callout:
      return (
        <p
          className={`text-xl ${weightDefaultNormal} ${commonClassNames.join(
            " ",
          )}`}
        >
          {children}
        </p>
      )

    case TypographyVariant.Paragraph:
      return (
        <p
          className={`text-sm ${weightDefaultNormal} ${commonClassNames.join(
            " ",
          )}`}
        >
          {children}
        </p>
      )

    case TypographyVariant.Subtitle:
      return (
        <h2
          className={`text-2xl ${weightDefaultBold} ${commonClassNames.join(
            " ",
          )}`}
        >
          {children}
        </h2>
      )

    case TypographyVariant.Span:
      return (
        <span
          className={`${weightDefaultNormal} ${commonClassNames.join(" ")}`}
        >
          {children}
        </span>
      )
  }
}
