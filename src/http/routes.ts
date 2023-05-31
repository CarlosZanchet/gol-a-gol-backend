import { FastifyInstance } from 'fastify'
import { authenticate } from './controller/authenticate'
import { register } from './controller/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/authenticate', authenticate)

  // authenticated routes
  // app.get('/me', { onRequest: [verifyJwt] }, profile)
}
