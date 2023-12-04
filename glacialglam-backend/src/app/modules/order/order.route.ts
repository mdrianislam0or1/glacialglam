import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// @desc    Create new order item
// @route   POST /api/orders/create-order
// @access  Private
router.post('/create-order', OrderControllers.createOrder);
// @desc    Get a single order by ID
// @route   GET /api/orders/:orderId
// @access  Private
router.get('/:orderId', OrderControllers.getSingleOrder);

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
router.get('/', OrderControllers.getAllOrders);

// @desc    Update a single order by ID
// @route   PUT /api/orders/:orderId
// @access  Private
router.put('/:orderId', OrderControllers.updateSingleOrder);

// @desc    Delete a single order by ID
// @route   DELETE /api/orders/:orderId
// @access  Private
router.delete('/:orderId', OrderControllers.deleteOrder);

export const OrderRoutes = router;
