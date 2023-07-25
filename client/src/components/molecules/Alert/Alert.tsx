import {
  AlertProps,
  AlertType,
} from "@client/components/molecules/Alert/@types/Alert"
import { mapAlertTypeToStyles } from "@client/components/molecules/Alert/styles"

export const Alert: React.FC<AlertProps> = ({
  children,
  icon,
  type = AlertType.Default,
}) => {
  const Icon = icon

  return (
    <div className={`alert ${mapAlertTypeToStyles[type].container}`}>
      {Icon && (
        <Icon
          className={`${mapAlertTypeToStyles[type].icon} shrink-0 w-6 h-6`}
        />
      )}
      <span className="text-sm">{children}</span>
    </div>
  )
}
