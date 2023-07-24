import { CardProps } from "@app/components/molecules/Card/@types/Card"

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`card compact shadow bg-base-100 rounded-box ${className}`}>
    <div className="card-body">{children}</div>
  </div>
)
