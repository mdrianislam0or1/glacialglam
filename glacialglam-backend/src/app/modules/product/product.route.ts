import express, { NextFunction, Request, Response } from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ProductSchema } from './product.validation';
import { upload } from '../../utils/sendImageInCloudinary';

const router = express.Router();

router.post(
  '/product',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductSchema),
  ProductControllers.createProductController,
);

router.get('/products', ProductControllers.getProductController);

router.put(
  '/products/:productId',
  auth('admin'),
  validateRequest(ProductSchema),
  ProductControllers.updateProductController,
);

router.get(
  '/products/:productId/reviews',
  ProductControllers.getReviewWithProductController,
);

router.get('/product/best', ProductControllers.getBestProductController);

//admin delete
// Delete a product (admin only)
router.delete(
  '/products/:productId',
  auth('admin'),
  ProductControllers.deleteProductController,
);

//admin get all products
// Get all products
router.get(
  '/admin/products',
  auth('admin'),
  ProductControllers.getAllProductsController,
);

export const ProductsRoutes = router;
