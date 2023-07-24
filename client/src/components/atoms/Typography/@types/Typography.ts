import { ReactNode } from "react"

export enum TypographyVariant {
  Title,
  Callout,
  Subtitle,
}

export enum TypographyAlignment {
  Left = "text-left",
  Center = "text-center",
  Right = "text-right",
}

export interface TypographyProps {
  alignment?: TypographyAlignment
  children: ReactNode | ReactNode[]
  className?: string
  variant: TypographyVariant
}
