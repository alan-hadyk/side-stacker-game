import { ReactNode } from "react"

export enum TypographyVariant {
  Title,
  Callout,
  Subtitle,
}

export interface TypographyProps {
  children: ReactNode | ReactNode[]
  className?: string
  variant: TypographyVariant
}
