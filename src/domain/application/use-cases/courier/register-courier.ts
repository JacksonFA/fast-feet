import { Either, left, right } from '@/core/either'
// import { Injectable } from '@nestjs/common'
import { Courier } from '../../../enterprise/entities/courier'
import { CouriersRepository } from '../../repositories/couriers.repository'
import { HashGenerator } from '../../cryptography/hash-generator'
import { CourierAlreadyExistsError } from '../errors/courier-already-exists.error'
import { CPF } from '@/domain/enterprise/entities/value-objects/cpf'

interface RegisterCourierInput {
  name: string
  document: string
  password: string
}

type RegisterCourierOutput = Either<
  CourierAlreadyExistsError,
  {
    courier: Courier
  }
>

// @Injectable()
export class RegisterCourierUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    document,
    password,
  }: RegisterCourierInput): Promise<RegisterCourierOutput> {
    const courierWithSameDocument = await this.couriersRepository.findByDocument(document)
    if (courierWithSameDocument) return left(new CourierAlreadyExistsError(document))
    const hashedPassword = await this.hashGenerator.hash(password)
    const courier = Courier.create({
      name,
      document: CPF.create(document),
      password: hashedPassword,
    })
    await this.couriersRepository.create(courier)
    return right({ courier })
  }
}
