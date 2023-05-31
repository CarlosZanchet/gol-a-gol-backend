import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { PasswordAndConfirmPasswordNotMatchError } from './errors/password-confirm-password-not-match-error'
import { UserAlreadyExistsError } from './errors/user-altready-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  confirm_password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    confirm_password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    if (password !== confirm_password) {
      throw new PasswordAndConfirmPasswordNotMatchError()
    }

    // incripta a senha do usuario
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
