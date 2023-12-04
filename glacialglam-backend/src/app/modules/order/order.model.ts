import mongoose, { Schema } from 'mongoose';
import { Order } from './order.interface';

export type OrderDocument = Order & mongoose.Document;

const orderItemSchema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderAddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<OrderDocument>(
  {
    items: [orderItemSchema],
    total: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    shippingAddress: orderAddressSchema,
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model<OrderDocument>('Order', orderSchema);

export default OrderModel;
