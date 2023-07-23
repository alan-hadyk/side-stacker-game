import { AvatarProps } from "@app/components/atoms/Avatar/@types/Avatar"

export const Avatar: React.FC<AvatarProps> = ({ children }) => (
  <div className="avatar placeholder">
    <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
      <span className="text-xl">{children}</span>
    </div>
  </div>
)
