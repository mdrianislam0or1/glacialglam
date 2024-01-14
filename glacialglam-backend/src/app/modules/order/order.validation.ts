import { z, ZodError } from "zod";
import validateRequest from "../../middleware/validateRequest";

const orderItemSchema = z.object({
  name: z.string().optional(),
  qty: z.number().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  product: z.string().optional(),
});

const shippingAddressSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

const paymentResultSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  update_time: z.string().optional(),
  email_address: z.string().optional(),
});

const orderSchema = z.object({
  orderItems: z.array(orderItemSchema).optional(),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.string().optional(),
  paymentResult: paymentResultSchema,
  itemsPrice: z.number().optional(),
  taxPrice: z.number().optional(),
  shippingPrice: z.number().optional(),
  totalPrice: z.number().optional(),
  isPaid: z.boolean().optional(),
  paidAt: z.date().optional(),
  isDelivered: z.boolean().optional(),
  deliveredAt: z.date().optional(),
});

const validateOrderRequest = validateRequest(orderSchema);

export default validateOrderRequest;
