import { Session } from "express-session"
import { CustomSessionData } from "@server/@types/expressSession"

declare module "http" {
  interface IncomingMessage {
    session: Session & CustomSessionData
  }
}
