import { IOrderItem } from "../modules/order/order.interface";

// Define the calcPrices function
export const calcPrices = (orderItems: IOrderItem[]) => {
    // Implement your logic for calculating prices here
    // For demonstration purposes, we'll assume all prices are 10
    const itemsPrice = orderItems.reduce((total, item) => total + item.price, 0);
    const taxPrice = itemsPrice * 0.1; // 10% tax
    const shippingPrice = 5; // Assuming a fixed shipping price
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
  
    return { itemsPrice, taxPrice, shippingPrice, totalPrice };
  };