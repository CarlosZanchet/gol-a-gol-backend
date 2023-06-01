import { Time } from '@prisma/client'

export interface ApiTimesRepository {
  createMany(times: Time[]): Promise<void>
}
