import express from 'express';
import { ProductControllers } from './product.controller';
import { ProductValidation, ProductValidationType } from './product.validation';
import { z } from 'zod';

const router = express.Router();

// Create a new product with validation middleware
router.post('/create-product', async (req, res) => {
  try {
    const productData: ProductValidationType = ProductValidation.parse(
      req.body,
    );
    // If validation passes, proceed to the controller
    await ProductControllers.createProduct(req, res, productData);
  } catch (error) {
    // If validation fails, send a 400 Bad Request response with validation errors
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors,
        });
    } else {
      // Handle other types of errors here
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
});

// Get all products
router.get('/', ProductControllers.getAllProducts);

// Get a single product by ID
router.get('/:productId', ProductControllers.getSingleProduct);

// Update a single product by ID
router.put('/:productId', ProductControllers.updateSingleProduct);

// Delete a single product by ID
router.delete('/:productId', ProductControllers.deleteProduct);
export const ProductRoutes = router;
