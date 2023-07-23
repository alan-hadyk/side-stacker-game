import { router } from "@app/routing"
import { RouterProvider } from "@tanstack/router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import "@app/styles/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
