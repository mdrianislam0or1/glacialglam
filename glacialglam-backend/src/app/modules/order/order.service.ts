// order.service.ts
import { Types } from 'mongoose';
import { calcPrices } from '../../utils/calcPrice';
import ProductModel from '../product/product.model';
import { TUser } from '../user/user.interface';
import { IOrder, IOrderItemsFromDB, IOrderItem } from './order.interface';
import Order, { IOrderDocument } from './order.model';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY; // Replace with your actual Stripe secret key
const stripeClient = new Stripe(stripeSecretKey || '');

// const addOrderItemsFromDB = async (
//   orderItems: IOrderItemsFromDB['orderItems'],
//   shippingAddress: IOrder['shippingAddress'],
//   paymentMethod: IOrder['paymentMethod'],
//   paymentResult: IOrder['paymentResult'],
//   user: TUser,
// ): Promise<IOrderDocument> => {
//   try {
//     if (!orderItems || orderItems.length === 0) {
//       throw new Error('No order items');
//     }

//     const itemsFromDB = await ProductModel.find({
//       _id: { $in: orderItems.map((x) => x.product) },
//     });

//     const dbOrderItems: IOrderItem[] = orderItems.map((itemFromClient) => {
//       const matchingItemFromDB = itemsFromDB.find(
//         (itemFromDB) =>
//           itemFromDB._id.toString() === itemFromClient.product.toString(),
//       );

//       if (!matchingItemFromDB) {
//         throw new Error(`Product not found for ${itemFromClient.product}`);
//       }

//       return {
//         name: matchingItemFromDB.name,
//         image: matchingItemFromDB.image,
//         price: matchingItemFromDB.price,
//         product: matchingItemFromDB._id,
//         qty: itemFromClient.qty,
//       };
//     });

//     const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
//       calcPrices(dbOrderItems);

//     const orderModel: IOrderDocument = new Order({
//       orderItems: dbOrderItems,
//       user: user._id,
//       shippingAddress,
//       paymentMethod,
//       paymentResult,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//       createdBy: user._id,
//     });

//     const createdOrder = await orderModel.save();

//     // Populate the createdBy field in the response
//     const populatedOrder = await Order.populate(createdOrder, {
//       path: 'createdBy',
//       select: '_id username email role',
//     });

//     return populatedOrder;
//   } catch (error) {
//     throw error;
//   }
// };

const updateProductCountInStock = async (orderItems: IOrderItem[]) => {
  try {
    const productsToRemove: string[] = [];

    for (const orderItem of orderItems) {
      const product = await ProductModel.findById(orderItem.product);

      if (!product) {
        throw new Error(`Product not found for ${orderItem.product}`);
      }

      product.countInStock -= orderItem.qty;

      if (product.countInStock < 0) {
        throw new Error(`Insufficient countInStock for ${product.name}`);
      }

      if (product.countInStock === 0) {
        productsToRemove.push(product._id.toString());
      }

      await product.save();
    }

    await removeProductsFromDatabase(productsToRemove);
  } catch (error) {
    throw error;
  }
};

const removeProductsFromDatabase = async (productIds: string[]) => {
  try {
    if (productIds.length > 0) {
      await ProductModel.deleteMany({ _id: { $in: productIds } });
    }
  } catch (error) {
    throw error;
  }
};

const addOrderItemsFromDB = async (
  orderItems: IOrder['orderItems'],
  shippingAddress: IOrder['shippingAddress'],
  paymentMethod: IOrder['paymentMethod'],
  paymentResult: IOrder['paymentResult'],
  user: TUser,
): Promise<IOrderDocument> => {
  try {
    if (!orderItems || orderItems.length === 0) {
      throw new Error('No order items');
    }

    const itemsFromDB = await ProductModel.find({
      _id: { $in: orderItems.map((x) => x.product) },
    });

    const dbOrderItems: IOrderItem[] = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) =>
          itemFromDB._id.toString() === itemFromClient.product.toString(),
      );

      if (!matchingItemFromDB) {
        throw new Error(`Product not found for ${itemFromClient.product}`);
      }

      return {
        name: matchingItemFromDB.name,
        image: matchingItemFromDB.image,
        price: matchingItemFromDB.price,
        product: matchingItemFromDB._id,
        qty: itemFromClient.qty,
      };
    });

    await updateProductCountInStock(dbOrderItems);

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const orderModel: IOrderDocument = new Order({
      orderItems: dbOrderItems,
      user: user._id,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      createdBy: user._id,
    });

    const createdOrder = await orderModel.save();

    // Populate the createdBy field in the response
    const populatedOrder = await Order.populate(createdOrder, {
      path: 'createdBy',
      select: '_id username email role',
    });

    return populatedOrder;
  } catch (error) {
    throw error;
  }
};

const getMyOrdersFromDB = async (user: TUser): Promise<IOrderDocument[]> => {
  try {
    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderByIdFromDB = async (
  orderId: string,
  user: TUser,
): Promise<IOrderDocument | null> => {
  try {
    // Find the order by ID and user
    const order = await Order.findOne({ _id: orderId, user: user._id });

    return order;
  } catch (error) {
    throw error;
  }
};

//payment start
const processPayment = async (
  tokenId: string,
  amount: number,
): Promise<any> => {
  try {
    const paymentIntent = await stripeClient.charges.create({
      source: tokenId,
      amount: Math.round(amount * 100),
      currency: 'usd',
    });

    return paymentIntent;
  } catch (error) {
    throw error;
  }
};
const markOrderAsPaid = async (
  orderId: string,
): Promise<IOrderDocument | null> => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error(`Order not found with id: ${orderId}`);
    }

    order.isPaid = true;
    order.paidAt = new Date();

    const updatedOrder = await order.save();

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};
//payment end

//admin start
const getOrdersForAdminFromDB = async (): Promise<IOrderDocument[]> => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw error;
  }
};

//delivery

const updateOrderDeliveryStatus = async (
  orderId: string,
  isDelivered: boolean,
): Promise<IOrderDocument | null> => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error(`Order not found with id: ${orderId}`);
    }

    order.isDelivered = isDelivered;
    order.deliveredAt = isDelivered ? new Date() : undefined;

    const updatedOrder = await order.save();

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

// delete order
const deleteOrder = async (orderId: string): Promise<IOrderDocument | null> => {
  try {
    const order = await Order.findByIdAndDelete(orderId);

    return order;
  } catch (error) {
    throw error;
  }
};

//admin end

export const OrderServices = {
  addOrderItemsFromDB,
  getMyOrdersFromDB,
  getOrderByIdFromDB,
  markOrderAsPaid,
  processPayment,
  // admin
  getOrdersForAdminFromDB,
  updateOrderDeliveryStatus,
  deleteOrder,
};
