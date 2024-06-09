import { PaginationParams } from '@/core/repositories/pagination-params'
import { CouriersRepository } from '@/domain/application/repositories/couriers.repository'
import { Courier } from '@/domain/enterprise/entities/courier'

export class InMemoryCouriersRepository implements CouriersRepository {
  public items: Courier[] = []

  async findById(id: string): Promise<Courier | null> {
    throw new Error('Method not implemented.')
  }

  async findMany(params: PaginationParams): Promise<Courier[]> {
    throw new Error('Method not implemented.')
  }

  async save(courier: Courier): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByDocument(document: string) {
    const courier = this.items.find((item) => item.document.value === document)
    if (!courier) return null
    return courier
  }

  async create(courier: Courier) {
    this.items.push(courier)
  }
}
