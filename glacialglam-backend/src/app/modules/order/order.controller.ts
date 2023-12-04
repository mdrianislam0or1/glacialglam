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

const getSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await OrderServices.getSingleOrder(orderId);

    if (!order) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: undefined,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error retrieving order:', error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      data: undefined,
    });
  }
});

const getAllOrders = catchAsync(async (req, res) => {
  try {
    const orders = await OrderServices.getAllOrders();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      data: undefined,
    });
  }
});

const updateSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const updateData = req.body;

  try {
    const updatedOrder = await OrderServices.updateSingleOrder(
      orderId,
      updateData,
    );

    if (!updatedOrder) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: undefined,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order updated successfully',
      data: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      data: undefined,
    });
  }
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await OrderServices.deleteOrder(orderId);

    if (!deletedOrder) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: undefined,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order deleted successfully',
      data: deletedOrder,
    });
  } catch (error) {
    console.error('Error deleting order:', error);
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
  getSingleOrder,
  getAllOrders,
  updateSingleOrder,
  deleteOrder,
};
