import { CustomError } from "@server/errors/customError"

export class ValidationError extends CustomError {
  constructor(message: string | string[]) {
    super(message, 400)
    this.name = "ValidationError"
  }
}
