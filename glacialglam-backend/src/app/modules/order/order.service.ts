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

// @desc    Get a single order by ID
// @route   GET /api/orders/:orderId
// @access  Private
const getSingleOrder = async (
  orderId: string,
): Promise<OrderDocument | null> => {
  try {
    const order = await OrderModel.findById(orderId);

    return order;
  } catch (error) {
    console.error('Error retrieving order:', error);
    throw error;
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getAllOrders = async (): Promise<OrderDocument[]> => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 }); // Sort by creation date in descending order

    return orders;
  } catch (error) {
    console.error('Error retrieving orders:', error);
    throw error;
  }
};

// @desc    Update a single order by ID
// @route   PUT /api/orders/:orderId
// @access  Private
const updateSingleOrder = async (
  orderId: string,
  updateData: Partial<OrderDocument>,
): Promise<OrderDocument | null> => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true },
    );

    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// @desc    Delete a single order by ID
// @route   DELETE /api/orders/:orderId
// @access  Private
const deleteOrder = async (orderId: string): Promise<OrderDocument | null> => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    return deletedOrder;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

export const OrderServices = {
  createOrder,
  getSingleOrder,
  getAllOrders,
  updateSingleOrder,
  deleteOrder,
};
