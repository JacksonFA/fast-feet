import { EditCourierUseCase } from './edit-courier'
import { CouriersRepository } from '@/domain/application/repositories/couriers.repository'
import { Courier } from '@/domain/enterprise/entities/courier'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CPF } from '@/domain/enterprise/entities/value-objects/cpf'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let editCourierUseCase: EditCourierUseCase
let mockCouriersRepository: CouriersRepository
let mockCourier: Courier

beforeEach(() => {
  mockCourier = {
    id: new UniqueEntityID('1'),
    name: 'Original Name',
    document: CPF.create('12345678901'),
    password: 'originalpassword'
  }

  mockCouriersRepository = {
    findById: vi.fn().mockResolvedValue(mockCourier),
    save: vi.fn().mockResolvedValue(undefined)
  } as unknown as CouriersRepository

  editCourierUseCase = new EditCourierUseCase(mockCouriersRepository)
})

describe('EditCourierUseCase', () => {
  it('should update courier successfully', async () => {
    const input = {
      id: '1',
      name: 'Updated Name',
      document: '98765432109'
    }
    const result = await editCourierUseCase.execute(input)
    expect(result.isRight()).toBe(true)
    expect(mockCouriersRepository.findById).toHaveBeenCalledWith('1')
    expect(mockCouriersRepository.save).toHaveBeenCalledWith({
      ...mockCourier,
      name: 'Updated Name',
      document: CPF.create('98765432109')
    })
    expect(result.value.courier.name).toEqual('Updated Name')
    expect(result.value.courier.document.value).toEqual('98765432109')
  })

  it('should return error if courier not found', async () => {
    mockCouriersRepository.findById = vi.fn().mockResolvedValue(null)
    const result = await editCourierUseCase.execute({ id: '2' })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
