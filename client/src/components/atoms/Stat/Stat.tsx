import { StatProps, StatVariant } from "@app/components/atoms/Stat/@types/Stat"
import { mapStatVariantToStyles } from "@app/components/atoms/Stat/styles"

export const Stat: React.FC<StatProps> = ({
  desc,
  icon,
  isLoading,
  title,
  value,
  variant = StatVariant.Primary,
}) => {
  const Icon = icon

  return (
    <div className="stat bg-white">
      <div className={`stat-figure ${mapStatVariantToStyles[variant]}`}>
        <Icon className="inline-block w-8 h-8 stroke-current" />
      </div>
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${mapStatVariantToStyles[variant]}`}>
        {isLoading ? (
          <span
            className={`loading loading-spinner loading-md ${mapStatVariantToStyles[variant]}`}
          ></span>
        ) : (
          value
        )}
      </div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  )
}
