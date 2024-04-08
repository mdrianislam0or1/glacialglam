import { IOrderItem } from '../modules/order/order.interface';

export const calcPrices = (orderItems: IOrderItem[]) => {
  const itemsPrice = orderItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  ); // Multiply price by quantity
  const taxPrice = itemsPrice * 0.1; // 10% tax
  const shippingPrice = 5; // Assuming a fixed shipping price
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};
