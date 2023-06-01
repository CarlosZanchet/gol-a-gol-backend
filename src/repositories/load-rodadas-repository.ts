import { Rodada } from '@prisma/client'

export interface LoadRodadasRepository {
  create(rodadas: Rodada[]): Promise<void>
}
