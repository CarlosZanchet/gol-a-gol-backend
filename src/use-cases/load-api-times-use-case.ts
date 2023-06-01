import { Time } from '@prisma/client'
import axios from 'axios'
import { env } from '../env'
import { ApiTimesRepository } from '../repositories/api-times-reposiroy'

export interface TimeApi {
  time_id: bigint
  nome_popular: string
  sigla: string
  escudo: string
}

export interface PartidaApi {
  time_mandante: TimeApi
  time_visitante: TimeApi
}

export class LoadApiTimesUseCase {
  constructor(private apiTimesRepository: ApiTimesRepository) {}

  async execute() {
    try {
      const response = await axios.get(
        'https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/1',
        {
          headers: {
            Authorization: `Bearer ${env.API_JOGOS_PROD}`,
          },
        },
      )

      const partidas: PartidaApi[] = response.data.partidas

      function convertApiToTime(timeApi: TimeApi): Time {
        return {
          id: timeApi.time_id,
          sigla: timeApi.sigla,
          escudo: timeApi.escudo,
          nome_popular: timeApi.nome_popular,
        }
      }

      const times: Time[] = []

      partidas.forEach((partida) => {
        times.push(convertApiToTime(partida.time_mandante))
        times.push(convertApiToTime(partida.time_visitante))
      })

      this.apiTimesRepository.createMany(times)

      return { times }
    } catch (err) {
      console.log(err)
    }
  }
}
