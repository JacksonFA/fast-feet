import { FetchCouriersUseCase } from './fetch-couriers'
import { CouriersRepository } from '@/domain/application/repositories/couriers.repository'
import { Courier } from '@/domain/enterprise/entities/courier'

describe('FetchCouriersUseCase', () => {
  let fetchCouriersUseCase: FetchCouriersUseCase
  let mockCouriersRepository: CouriersRepository
  let mockCouriers: any[]

  beforeEach(() => {
    mockCouriers = [
      { id: '1', name: 'Courier One', document: '12345678901', password: 'hashedpassword1' },
      { id: '2', name: 'Courier Two', document: '12345678902', password: 'hashedpassword2' }
    ]

    mockCouriersRepository = {
      findMany: vi.fn().mockResolvedValue(mockCouriers)
    } as unknown as CouriersRepository

    fetchCouriersUseCase = new FetchCouriersUseCase(mockCouriersRepository)
  })

  it('should fetch couriers successfully', async () => {
    const page = 0
    const result = await fetchCouriersUseCase.execute({ page })

    expect(result.isRight()).toBe(true)
    expect(result.value.couriers).toEqual(mockCouriers)
    expect(mockCouriersRepository.findMany).toHaveBeenCalledWith({ page })
  })

  it('should handle different pages correctly', async () => {
    const page = 1
    await fetchCouriersUseCase.execute({ page })
    expect(mockCouriersRepository.findMany).toHaveBeenCalledWith({ page })
  })
})