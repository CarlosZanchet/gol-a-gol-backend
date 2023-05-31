export class PasswordAndConfirmPasswordNotMatchError extends Error {
  constructor() {
    super('Senha e confirmação são incompatíveis')
  }
}
