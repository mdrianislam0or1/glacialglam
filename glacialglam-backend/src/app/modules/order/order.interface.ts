export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: OrderAddress;
  orderDate: Date;
}
