import {
  ProgressProps,
  ProgressVariant,
} from "@client/components/atoms/Progress/@types/Progress"

export const Progress: React.FC<ProgressProps> = ({
  className = "",
  variant = ProgressVariant.Primary,
}) => <progress className={`progress ${variant} w-full ${className}`} />
