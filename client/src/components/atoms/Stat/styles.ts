import { StatVariant } from "@client/components/atoms/Stat/@types/Stat"

export const mapStatVariantToStyles: Record<StatVariant, string> = {
  [StatVariant.Primary]: "text-primary-focus",
  [StatVariant.Secondary]: "text-secondary-focus",
  [StatVariant.Accent]: "text-accent-focus",
}
