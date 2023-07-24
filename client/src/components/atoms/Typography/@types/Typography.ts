import { ReactNode } from "react"

export enum TypographyVariant {
  Title,
  Callout,
  Subtitle,
  Span,
}

export enum TypographyAlignment {
  Left = "text-left",
  Center = "text-center",
  Right = "text-right",
}

export enum TypographyColor {
  Primary = "text-primary",
  Secondary = "text-secondary",
  Accent = "text-accent",
  Inherit = "text-inherit",
  Current = "text-current",
}

export enum TypographyWeight {
  Normal = "font-normal",
  Bold = "font-bold",
}

export interface TypographyProps {
  alignment?: TypographyAlignment
  children: ReactNode | ReactNode[]
  className?: string
  color?: TypographyColor
  variant: TypographyVariant
  weight?: TypographyWeight
}
