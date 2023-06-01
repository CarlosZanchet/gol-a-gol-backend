import { PrismaApiTimesRepository } from '../../repositories/prisma/prisma-api-times-reposiroy'
import { LoadApiTimesUseCase } from '../load-api-times-use-case'

export function makeLoadApiTimesUseCase() {
  const apiTimesRepository = new PrismaApiTimesRepository()
  const loadApiTimesUseCase = new LoadApiTimesUseCase(apiTimesRepository)

  return loadApiTimesUseCase
}
