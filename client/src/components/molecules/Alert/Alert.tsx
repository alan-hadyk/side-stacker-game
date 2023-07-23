import {
  AlertProps,
  AlertType,
} from "@app/components/molecules/Alert/@types/Alert"
import { mapAlertTypeToStyles } from "@app/components/molecules/Alert/styles"

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
      <span>{children}</span>
    </div>
  )
}
