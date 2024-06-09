import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Courier,
  CourierProps,
} from '@/domain/enterprise/entities/courier'
import { CPF } from '@/domain/enterprise/entities/value-objects/cpf'
// import { Injectable } from '@nestjs/common'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'
// import { PrismaCourierMapper } from '@/infra/database/prisma/mappers/prisma-courier-mapper'

export function makeCourier(
  override: Partial<CourierProps> = {},
  id?: UniqueEntityID,
) {
  const courier = Courier.create(
    {
      name: faker.person.fullName(),
      document: CPF.create('34718941016'),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
  return courier
}

// @Injectable()
// export class CourierFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaCourier(data: Partial<CourierProps> = {}): Promise<Courier> {
//     const courier = makeCourier(data)

//     await this.prisma.user.create({
//       data: PrismaCourierMapper.toPrisma(courier),
//     })

//     return courier
//   }
// }
