import { DeleteCourierUseCase } from './delete-courier'
import { CouriersRepository } from '@/domain/application/repositories/couriers.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let deleteCourierUseCase: DeleteCourierUseCase
let mockCouriersRepository: CouriersRepository

beforeEach(() => {
  mockCouriersRepository = {
    findById: vi.fn(),
    delete: vi.fn()
  } as unknown as CouriersRepository
  deleteCourierUseCase = new DeleteCourierUseCase(mockCouriersRepository)
})

describe('DeleteCourierUseCase', () => {
  it('should delete a courier successfully', async () => {
    const courierId = '1'
    mockCouriersRepository.findById.mockResolvedValue({ id: courierId, name: 'Test Courier', document: '12345678901', password: 'hashedpassword' })
    const result = await deleteCourierUseCase.execute({ id: courierId })
    expect(result.isRight()).toBe(true)
    expect(mockCouriersRepository.findById).toHaveBeenCalledWith(courierId)
    expect(mockCouriersRepository.delete).toHaveBeenCalledWith(courierId)
  })

  it('should return an error if the courier does not exist', async () => {
    const courierId = '2'
    mockCouriersRepository.findById.mockResolvedValue(null)
    const result = await deleteCourierUseCase.execute({ id: courierId })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(mockCouriersRepository.delete).not.toHaveBeenCalled()
  })
})
