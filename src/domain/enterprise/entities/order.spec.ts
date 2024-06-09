import { Order, OrderProps } from './order';
import { OrderStatus, OrderStatusEnum } from './value-objects/order-status';
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

describe('Order', () => {
  const baseProps: OrderProps = {
    recipientId: new UniqueEntityID(),
    status: OrderStatus.create(OrderStatusEnum.PENDING),
    postedAt: new Date(),
    withdrownAt: null,
    deliveredAt: null
  };

  it('should throw an error if an invalid status is set', () => {
    const order = Order.create(baseProps);
    const invalidStatus: any = { value: 'invalid_status' };
    expect(() => { order.status = invalidStatus }).toThrow('Status inválido.');
  });

  it('should not allow status change from PENDING to DELIVERED', () => {
    const order = Order.create(baseProps);
    const deliveredStatus = OrderStatus.create(OrderStatusEnum.DELIVERED);
    expect(() => order.status = deliveredStatus).toThrow('Status inválido.');
  });

  it('should allow status change from PENDING to WITHDRAW', () => {
    const order = Order.create(baseProps);
    const withdrawStatus = OrderStatus.create(OrderStatusEnum.WITHDRAW);
    expect(() => order.status = withdrawStatus).not.toThrow();
    expect(order.status.value).toBe(OrderStatusEnum.WITHDRAW);
  });

  it('should allow status change from WITHDRAW to DELIVERED', () => {
    const modifiedProps = { ...baseProps, status: OrderStatus.create(OrderStatusEnum.WITHDRAW) };
    const order = Order.create(modifiedProps);
    const deliveredStatus = OrderStatus.create(OrderStatusEnum.DELIVERED);
    expect(() => order.status = deliveredStatus).not.toThrow();
    expect(order.status.value).toBe(OrderStatusEnum.DELIVERED);
  });

  it('should not allow status change from DELIVERED to any other status', () => {
    const modifiedProps = { ...baseProps, status: OrderStatus.create(OrderStatusEnum.DELIVERED) };
    const order = Order.create(modifiedProps);
    const pendingStatus = OrderStatus.create(OrderStatusEnum.PENDING);
    expect(() => order.status = pendingStatus).toThrow('Status inválido.');
  });
});