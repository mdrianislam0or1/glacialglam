import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// @desc    Create new order item
// @route   POST /api/orders/create-order
// @access  Private
router.post('/create-order', OrderControllers.createOrder);

export const OrderRoutes = router;
