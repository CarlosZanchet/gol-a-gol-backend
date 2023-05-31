import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase
let sut: AuthenticateUseCase

describe('Authenticate use case test unit', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('espera uma excecao quando tenta efetuar o login com um email que nao foi cadastrado', async () => {
    await registerUseCase.execute({
      name: 'Carlos Zanchet',
      email: 'email@carloszanchet.com',
      password: '1234567',
      confirm_password: '1234567',
    })

    await expect(() =>
      sut.execute({
        email: 'invalido@invalido.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('espera uma excecao quando tenta efetuar o login com uma senha invalida', async () => {
    await registerUseCase.execute({
      name: 'Carlos Zanchet',
      email: 'invalido@invalido.com',
      password: '1234567',
      confirm_password: '1234567',
    })

    await expect(() =>
      sut.execute({
        email: 'invalido@invalido.com',
        password: 'senha_invalida',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('valida se retorna o token de autenticacao ao efetuar login corretamente', async () => {
    await registerUseCase.execute({
      name: 'Carlos Zanchet',
      email: 'carlos@carlos.com',
      password: '1234567',
      confirm_password: '1234567',
    })

    const { user } = await sut.execute({
      email: 'carlos@carlos.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
