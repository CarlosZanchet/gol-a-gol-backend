import { Rodada } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { LoadRodadasRepository } from '../load-rodadas-repository'

export class PrismaLoadRodadasRepository implements LoadRodadasRepository {
  async create(rodadas: Rodada[]) {
    await prisma.rodada.createMany({
      data: rodadas,
    })
  }
}
