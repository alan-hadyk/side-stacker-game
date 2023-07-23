export enum LogoSize {
  Sm,
  Lg,
}
export interface LogoProps {
  className?: {
    img?: string
    typography?: string
  }
  size?: LogoSize
}
