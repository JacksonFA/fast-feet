import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { OrderStatus, OrderStatusEnum } from "./value-objects/order-status";

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

  get recipient() {
    return this.props.recipientId
  }

  get status() {
    return this.props.status
  }

  set status(status: OrderStatus) {
    const newStatus = status.value
    const currentStatus = this.props.status.value
    const isValidStatus = OrderStatus.isValidStatus(currentStatus, newStatus)
    if (!isValidStatus) throw new Error('Status inválido.')
    if (newStatus === OrderStatusEnum.PENDING) this.props.postedAt = new Date()
    if (newStatus === OrderStatusEnum.WITHDRAW) this.props.withdrownAt = new Date()
    if (newStatus === OrderStatusEnum.DELIVERED) this.props.deliveredAt = new Date()
    this.props.status = status
  }

  get dates() {
    return {
      postedAt: this.props.postedAt,
      withdrownAt: this.props.withdrownAt,
      deliveredAt: this.props.deliveredAt
    }
  }
}
