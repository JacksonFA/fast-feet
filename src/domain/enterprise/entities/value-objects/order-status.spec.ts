import { OrderStatus, OrderStatusEnum } from './order-status';

describe('OrderStatus', () => {
  it('should create an OrderStatus object for each enum value', () => {
    Object.values(OrderStatusEnum).forEach(value => {
      const status = OrderStatus.create(value);
      expect(status.value).toBe(value);
    });
  });
});
