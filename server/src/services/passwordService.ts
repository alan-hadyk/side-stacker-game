import * as argon2 from "argon2"

export class PasswordService {
  static hash = async (password: string) => argon2.hash(password)

  static verify = async (hash: string, password: string) =>
    argon2.verify(hash, password)
}
