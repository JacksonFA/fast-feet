import { ValueObject } from "@/core/entities/value-object"

export enum OrderStatusEnum {
  PENDING = 'aguardando',
  WITHDRAW = 'retirada',
  DELIVERED = 'entregue',
}

export class OrderStatus extends ValueObject<OrderStatusEnum> {
  static create(value: OrderStatusEnum) {
    return new OrderStatus(value)
  }
}
