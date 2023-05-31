import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PasswordAndConfirmPasswordNotMatchError } from '../../use-cases/errors/password-confirm-password-not-match-error'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-altready-exists-error'
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string().nonempty('Nome não pode ser vazio'),
    email: z.string().nonempty('Email não pode ser vazio'),
    password: z
      .string()
      .nonempty()
      .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
    confirm_password: z
      .string()
      .nonempty()
      .min(6, 'Confirmação de senha precisa ter no mínimo 6 caracteres'),
  })

  const { name, email, password, confirm_password } = registerSchema.parse(
    request.body,
  )

  const registerUseCase = makeRegisterUseCase()

  try {
    await registerUseCase.execute({
      name,
      email,
      password,
      confirm_password,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof PasswordAndConfirmPasswordNotMatchError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
