import { FastifyReply, FastifyRequest } from 'fastify'
import { makeLoadApiTimesUseCase } from '../../use-cases/factories/make-load-api-times-use-case'

export async function loadApiTimes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const loadApiTimesUseCase = makeLoadApiTimesUseCase()

  const times = await loadApiTimesUseCase.execute()

  reply.status(200).send(times)
}
