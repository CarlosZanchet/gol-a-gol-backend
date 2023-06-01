import { PrismaLoadRodadasRepository } from '../../repositories/prisma/prisma-load-rodadas-repository'
import { LoadRodadasUseCase } from '../load-rodadas'

export function makeLoadRodadaUseCase() {
  const loadRodadasRepositories = new PrismaLoadRodadasRepository()
  const loadRodadaUseCase = new LoadRodadasUseCase(loadRodadasRepositories)
  return loadRodadaUseCase
}
