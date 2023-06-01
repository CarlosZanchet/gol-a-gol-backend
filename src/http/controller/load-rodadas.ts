import { FastifyReply, FastifyRequest } from 'fastify'
import { makeLoadRodadaUseCase } from '../../use-cases/factories/make-load-rodada-use-case'

export async function loadRodadas(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const loadRodadaUseCase = makeLoadRodadaUseCase()

  await loadRodadaUseCase.execute()
}
