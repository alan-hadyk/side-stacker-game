import { CardProps } from "@app/components/molecules/Card/@types/Card"

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
}) => (
  <div
    className={`card z-[1] compact shadow bg-base-100 rounded-box ${className}`}
  >
    {title && <h2 className="card-title px-4 pt-4">{title}</h2>}
    <div className="card-body">{children}</div>
  </div>
)
