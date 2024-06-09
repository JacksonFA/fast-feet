import { Either, right } from '@/core/either'
import { Courier } from '@/domain/enterprise/entities/courier'
import { CouriersRepository } from '@/domain/application/repositories/couriers.repository'

interface FetchCouriersInput {
  page?: number
}

type FetchCouriersOutput = Either<
  null,
  {
    couriers: Courier[]
  }
>

export class FetchCouriersUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
  ) {}

  async execute({ page = 0 }: FetchCouriersInput): Promise<FetchCouriersOutput> {
    const couriers = await this.couriersRepository.findMany({ page })
    return right({ couriers })
  }
}