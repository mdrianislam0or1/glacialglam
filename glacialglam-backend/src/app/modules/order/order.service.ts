import ProductModel from '../product/product.model';
import OrderModel, { OrderDocument } from './order.model';

interface CreateOrderParams {
  items: { productId: string; quantity: number }[];
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

const createOrder = async ({
  items,
  customerName,
  customerEmail,
  shippingAddress,
}: CreateOrderParams): Promise<OrderDocument> => {
  try {
    const orderTotal = await calculateOrderTotal(items);

    const newOrder = new OrderModel({
      items,
      total: orderTotal,
      customerName,
      customerEmail,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const calculateOrderTotal = async (
  items: { productId: string; quantity: number }[],
): Promise<number> => {
  try {
    let total = 0;

    for (const item of items) {
      const product = await ProductModel.findById(item.productId);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      total += product.price * item.quantity;
    }

    return total;
  } catch (error) {
    console.error('Error calculating order total:', error);
    throw error;
  }
};

export const OrderServices = {
  createOrder,
};
