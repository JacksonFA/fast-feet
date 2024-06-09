import { Either, left, right } from '@/core/either'
import { CouriersRepository } from '@/domain/application/repositories/couriers.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteCourierInput {
  id: string
}

type DeleteCourierOutput = Either<
  ResourceNotFoundError,
  void
>

export class DeleteCourierUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
  ) {}

  async execute({ id }: DeleteCourierInput): Promise<DeleteCourierOutput> {
    const courier = await this.couriersRepository.findById(id)
    if (!courier) return left(new ResourceNotFoundError())
    await this.couriersRepository.delete(id)
    return right(undefined)
  }
}
