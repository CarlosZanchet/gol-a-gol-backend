import { Time } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { ApiTimesRepository } from '../api-times-reposiroy'

export class PrismaApiTimesRepository implements ApiTimesRepository {
  async createMany(times: Time[]) {
    await prisma.time.createMany({
      data: times,
    })
  }
}
