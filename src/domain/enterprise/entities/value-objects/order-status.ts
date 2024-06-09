import { ValueObject } from "@/core/entities/value-object"

export enum OrderStatusEnum {
  PENDING = 'aguardando',
  WITHDRAW = 'retirada',
  DELIVERED = 'entregue',
  RETURNED = 'devolvida',
}

export class OrderStatus extends ValueObject<OrderStatusEnum> {
  static create(value: OrderStatusEnum) {
    return new OrderStatus(value)
  }

/**
 * Validates if a status change is allowed based on the current and new status.
 * @param currentStatus - The current status of the order.
 * @param newStatus - The new status to which the order is being changed.
 * @returns {boolean} - Returns true if the status change is allowed, otherwise false.
 */
static isValidStatus(currentStatus: OrderStatusEnum, newStatus: OrderStatusEnum): boolean {
  if (!Object.values(OrderStatusEnum).includes(newStatus)) return false;
  const invalidStatusChange =
    (currentStatus === OrderStatusEnum.PENDING && (newStatus === OrderStatusEnum.DELIVERED || newStatus === OrderStatusEnum.RETURNED)) ||
    (currentStatus === OrderStatusEnum.WITHDRAW && newStatus === OrderStatusEnum.PENDING) ||
    (currentStatus === OrderStatusEnum.DELIVERED && (newStatus === OrderStatusEnum.WITHDRAW || newStatus === OrderStatusEnum.PENDING)) ||
    (currentStatus === OrderStatusEnum.RETURNED && (newStatus === OrderStatusEnum.WITHDRAW || newStatus === OrderStatusEnum.PENDING || newStatus === OrderStatusEnum.DELIVERED))
  return !invalidStatusChange;
}
}
