// order.interface.ts
import mongoose, { Types } from 'mongoose';
import { IProduct } from '../product/product.interface';
import { TUser } from '../user/user.interface';

export type IOrderItemsFromDB = {
  orderItems: {
    product: mongoose.Types.ObjectId | IProduct;
    qty: number;
    _id?: mongoose.Types.ObjectId;
  }[];
}

export interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: mongoose.Types.ObjectId | IProduct;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IPaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrder {
  user: mongoose.Types.ObjectId | TUser;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult?: IPaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdBy: Types.ObjectId;
}
