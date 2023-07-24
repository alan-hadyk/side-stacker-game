export enum ProgressVariant {
  Primary = "progress-primary",
  Secondary = "progress-secondary",
  Accent = "progress-accent",
}

export interface ProgressProps {
  className?: string
  variant?: ProgressVariant
}
