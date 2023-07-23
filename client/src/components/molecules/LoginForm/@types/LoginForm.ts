import { Player } from "@app/@types/api"

export interface LoginFormValues {
  username: Player["username"]
}

export interface LoginFormProps {
  isLoading?: boolean
  onSubmit: (values: LoginFormValues) => void
}
