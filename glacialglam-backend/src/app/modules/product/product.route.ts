import express from 'express';
import { ProductControllers } from './product.controller';
import { admin, protect } from '../../middlewares/authMiddleware';

const router = express.Router();

// Use the product routes
router.use('/create-product', ProductControllers.createProduct);
// Get all products
router.get('/', ProductControllers.getAllProducts);

// Get a single product by ID
router.get('/:productId', ProductControllers.getSingleProduct);

// Update a single product by ID
router.put('/:productId', ProductControllers.updateSingleProduct);

// Delete a single product by ID
router.delete('/:productId', ProductControllers.deleteProduct);
export const ProductRoutes = router;
