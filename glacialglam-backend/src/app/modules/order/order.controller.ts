import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.service';
import { TUser } from '../user/user.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IOrder } from './order.interface';
import { IOrderDocument } from './order.model';

import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY // Replace with your actual Stripe secret key
const stripeClient = new Stripe(stripeSecretKey || "");


const addOrderItemsController = catchAsync(async (req: Request, res: Response) => {
  console.log('Request Body:', req.body);
  const { orderItems, shippingAddress, paymentMethod, paymentResult } = req.body;

  if (!orderItems || !shippingAddress || !paymentMethod || !paymentResult) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Invalid request. Missing required properties.',
    });
    return;
  }

  const user: TUser = req.user as TUser;

  if (!user) {
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'Unauthorized. User not found.',
    });
    return;
  }

  const order = await OrderServices.addOrderItemsFromDB(
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    user
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created successfully.',
    data: order,
  });
});


const getMyOrdersController = catchAsync(async (req: Request, res: Response) => {
    const user: TUser = req.user as TUser;
  
    if (!user) {
      sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Unauthorized. User not found.',
      });
      return;
    }
  
    const myOrders = await OrderServices.getMyOrdersFromDB(user);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'My Orders retrieved successfully.',
      data: myOrders,
    });
  });
  
  const getOrderByIdController = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const user = req.user as TUser;
  
    // Call the service function to get the order by ID
    const order = await OrderServices.getOrderByIdFromDB(orderId, user);
  
    if (!order) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Order not found.",
      });
    }
  
    // Modify the response if needed
    const modifiedOrder = {
        ...order.toObject(),
        createdBy: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    };

    sendResponse(res, {
        success: true,
        statusCode: 200,
        data: modifiedOrder,
    });
  });
  


// payment start
const processPaymentController = catchAsync(async (req: Request, res: Response) => {
  const tokenId = req.body.tokenId;
  const amount = req.body.amount;

  try {
    const paymentResult = await OrderServices.processPayment(tokenId, amount);

    // Check if the payment was successful
    if (paymentResult.status === "succeeded") {
      // Update the order as paid
      const orderId = req.params.orderId;
      const updatedOrder = await OrderServices.markOrderAsPaid(orderId);

      if (!updatedOrder) {
        return sendResponse(res, {
          success: false,
          statusCode: 404,
          message: "Order not found.",
        });
      }

      sendResponse(res, {
        success: true,
        statusCode: 200,
        data: {
          paymentResult,
          updatedOrder,
        },
        message: "Payment processed successfully, and order marked as paid.",
      });
    } else {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Payment failed.",
        data: {
          paymentResult,
        },
      });
    }
  } catch (error:any) {
    console.error('Error processing payment:', error.message);
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

// payment end



export const OrderControllers = {
  addOrderItemsController,
    getMyOrdersController,
    getOrderByIdController,
    processPaymentController,
};
