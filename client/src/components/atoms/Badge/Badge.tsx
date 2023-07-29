import {
  BadgeProps,
  BadgeSize,
  BadgeType,
} from "@client/components/atoms/Badge/@types/Badge"

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  size = BadgeSize.Md,
  type = BadgeType.Default,
}) => <div className={`badge ${size} ${type} ${className}`}>{children}</div>
