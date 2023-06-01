import { FastifyInstance } from 'fastify'
import { authenticate } from './controller/authenticate'
import { loadApiTimes } from './controller/load-api-times'
import { loadRodadas } from './controller/load-rodadas'
import { register } from './controller/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/authenticate', authenticate)

  // authenticated routes
  // app.get('/me', { onRequest: [verifyJwt] }, profile)

  app.get('/load-rodadas', loadRodadas)
  app.get('/carregar-times', loadApiTimes)
}
