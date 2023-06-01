import axios from 'axios'
import { LoadRodadasRepository } from '../repositories/load-rodadas-repository'

/* interface LoadRodadasUseCaseRequest {
  idCampeonato: number
}

 interface LoadRodadasUseCaseResponse {
  rodada: Rodada
} */

interface RodadaApi {
  nome: string
  slug: string
  rodada: string
  status: string
  _link: string
}

export class LoadRodadasUseCase {
  constructor(private loadRodadasRepositories: LoadRodadasRepository) {}

  async execute(): Promise<void> {
    try {
      const response = await axios.get(
        'https://api.api-futebol.com.br/v1/campeonatos/10/rodadas',
        {
          headers: {
            Authorization: `Bearer live_0d8be63f50403692c5e9a4d12ce043`,
          },
        },
      )

      const rodadas = response.data.map((data: RodadaApi) => {
        return {
          nome: data.nome,
          slug: data.slug,
          rodada: data.rodada,
          status: data.status,
          link: data._link,
        }
      })

      await this.loadRodadasRepositories.create(rodadas)
    } catch (err) {
      console.log(err)
    }
  }
}
