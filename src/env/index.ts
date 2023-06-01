import { z } from 'zod'

// carrega todas as variaveis de ambiente com o dotenv, quando sobre a aplicacao
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333), // pega o dado e converte para o dado que eu informar
  JWT_SECRET: z.string(),
  API_JOGOS_TEST: z.string(),
  API_JOGOS_PROD: z.string(),
  BRASILEIRAO_ID: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variable', _env.error.format())
  throw new Error('Invalid environment variable')
}

export const env = _env.data
