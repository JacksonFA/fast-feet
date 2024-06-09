import { Either, left, right } from '@/core/either'
import { Courier } from '@/domain/enterprise/entities/courier'
import { CouriersRepository } from '@/domain/application/repositories/couriers.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CPF } from '@/domain/enterprise/entities/value-objects/cpf'

interface EditCourierInput {
  id: string
  name?: string
  document?: string
  password?: string
}

type EditCourierOutput = Either<
  ResourceNotFoundError,
  {
    courier: Courier
  }
>

export class EditCourierUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
  ) {}

  async execute({
    id,
    name,
    document,
  }: EditCourierInput): Promise<EditCourierOutput> {
    const courier = await this.couriersRepository.findById(id)
    if (!courier) {
      return left(new ResourceNotFoundError())
    }
    courier.name = name ?? courier.name
    courier.document = document ? CPF.create(document) : courier.document
    await this.couriersRepository.save(courier)
    return right({ courier })
  }
}
