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





// const paymentController = catchAsync(async (req: Request, res: Response) => {
//   stripeClient.charges.create({
//     source: req.body.tokenId,
//     amount: req.body.amount,
//     currency: "usd",
//   }).then((response) => {
    
//     res.status(200).json(response);
//   }).catch((error) => {
//     console.log(error);
//     res.status(400).json({ error });
//   });
  
// })


// payment intent

const createPaymentIntentController = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  try {
    
    const paymentIntent = await OrderServices.createPaymentIntent(orderId);

    // Check if the clientSecret is available in the response
    if (paymentIntent && paymentIntent.clientSecret) {
      // Update the order as paid
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
        data: {updatedOrder, clientSecret: paymentIntent.clientSecret},
        message: "PaymentIntent created successfully, and order marked as paid.",
      });
    } else {
      sendResponse(res, {
        success: false,
        statusCode: 500,
        message: "Failed to create PaymentIntent.",
      });
    }
  } catch (error:any) {
    console.error('Error creating PaymentIntent:', error.message);
    res.status(500).json({ error: 'Failed to create PaymentIntent' });
  }
});

// payment end

  const updateOrderToPaidController = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const { paymentResult } = req.body;
  
    try {
      const updatedOrder = await OrderServices.updateOrderToPaid(orderId, paymentResult);
  
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
        data: updatedOrder,
        message: "Order updated to paid successfully.",
      });
    } catch (error :any) {
      console.error('Error updating order to paid:', error.message);
      res.status(500).json({ error: 'Failed to update order to paid' });
    }
  });
  
  const updateOrderToDeliveredController = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
  
    try {
      const updatedOrder = await OrderServices.updateOrderToDelivered(orderId);
  
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
        data: updatedOrder,
        message: "Order updated to delivered successfully.",
      });
    } catch (error :any) {
      console.error('Error updating order to delivered:', error.message);
      res.status(500).json({ error: 'Failed to update order to delivered' });
    }
  });


export const OrderControllers = {
  addOrderItemsController,
    getMyOrdersController,
    getOrderByIdController,
    updateOrderToPaidController,
    updateOrderToDeliveredController,
    createPaymentIntentController,
    processPaymentController,
    // paymentController 

};
