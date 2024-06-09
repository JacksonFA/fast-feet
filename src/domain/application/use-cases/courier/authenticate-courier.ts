import { Either, left, right } from '@/core/either'
// import { Injectable } from '@nestjs/common'
import { CouriersRepository } from '../../repositories/couriers.repository'
import { HashComparer } from '../../cryptography/hash-comparer'
import { Encrypter } from '../../cryptography/encrypter'
import { WrongCredentialsError } from '../errors/wrong-credentials.error'

interface AuthenticateCourierInput {
  document: string
  password: string
}

type AuthenticateCourierOutput = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

// @Injectable()
export class AuthenticateCourierUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({ document, password }: AuthenticateCourierInput): Promise<AuthenticateCourierOutput> {
    const courier = await this.couriersRepository.findByDocument(document)
    if (!courier) return left(new WrongCredentialsError())
    const isPasswordValid = await this.hashComparer.compare(
      password,
      courier.password,
    )
    if (!isPasswordValid) return left(new WrongCredentialsError())
    const accessToken = await this.encrypter.encrypt({
      sub: courier.id.toString(),
    })
    return right({ accessToken })
  }
}
