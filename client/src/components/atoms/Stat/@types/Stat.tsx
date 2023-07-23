import { IconType } from "react-icons"

export enum StatVariant {
  Primary,
  Secondary,
  Accent,
}

export interface StatProps {
  desc?: string
  icon: IconType
  isLoading?: boolean
  title: string
  value?: string | number
  variant?: StatVariant
}
