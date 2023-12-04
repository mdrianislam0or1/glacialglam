import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const { items, customerName, customerEmail, shippingAddress } = req.body;

  try {
    const newOrder = await OrderServices.createOrder({
      items,
      customerName,
      customerEmail,
      shippingAddress,
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      data: undefined,
    });
  }
});

export const OrderControllers = {
  createOrder,
};
