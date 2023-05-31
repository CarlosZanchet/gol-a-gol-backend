export class EntityNotFoundError extends Error {
  constructor() {
    super('Entidade não encontrada')
  }
}
