import { LoginForm } from "@app/components/molecules/LoginForm/LoginForm"

export const LoginContainer: React.FC = () => {
  return (
    <LoginForm
      // isLoading
      onSubmit={(data) => {
        console.log("DATA", data)
      }}
    />
  )
}
