import { config } from "@app/config"
import { io } from "socket.io-client"

export const websocketsClient = io(config.api.httpBaseUrl)
