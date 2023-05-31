import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { PasswordAndConfirmPasswordNotMatchError } from './errors/password-confirm-password-not-match-error'
import { UserAlreadyExistsError } from './errors/user-altready-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case unit test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('verifica se está retornando 201 quando os dados passados corretamente', async () => {
    const { user } = await sut.execute({
      name: 'Carlos Zanchet',
      email: 'email@carloszanchet.com',
      password: 'minhasenhaseisdigitos',
      confirm_password: 'minhasenhaseisdigitos',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Verifica se hash de senha do usuario salvo está condizendo com a encriptacao do bcript', async () => {
    const { user } = await sut.execute({
      name: 'Carlos Zanchet',
      email: 'email@carloszanchet.com',
      password: '123456',
      confirm_password: '123456',
    })

    const passwordCripty = await compare('123456', user.password_hash)

    expect(passwordCripty).toBe(true)
  })

  it('Verifica se quando senha e confirmacao de senha sao difrerentes gera uma exceção', async () => {
    await expect(() =>
      sut.execute({
        name: 'Carlos Zanchet',
        email: 'email@carloszanchet.com',
        password: 'minhasenha',
        confirm_password: 'minhasenhadiferente',
      }),
    ).rejects.toBeInstanceOf(PasswordAndConfirmPasswordNotMatchError)
  })

  it('Verifica se quando tenta salvar usuario que ja tem email no banco, gera exceção', async () => {
    const email = 'carlosemail@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '1234567',
      confirm_password: '1234567',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '1234567',
        confirm_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
