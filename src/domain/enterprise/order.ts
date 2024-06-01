import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { OrderStatus } from "./value-objects/order-status";

export type OrderProps = {
  recipientId: UniqueEntityID
  status: OrderStatus
  postedAt?: Date | null
  withdrownAt?: Date | null
  deliveredAt?: Date | null
}

export class Order extends Entity<OrderProps> {
  static create(props: OrderProps, id?: UniqueEntityID) {
    const order = new Order(props, id)
    return order
  }
}
