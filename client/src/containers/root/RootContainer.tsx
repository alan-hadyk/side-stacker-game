import { Outlet } from "@tanstack/router"

export const RootContainer: React.FC = () => {
  console.log(window.localStorage)
  return (
    <div>
      <h1>My App</h1>
      <Outlet /> {/* This is where child routes will render */}
    </div>
  )
}
