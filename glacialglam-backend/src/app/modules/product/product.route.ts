import express from "express";
import {  ProductControllers } from "./product.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { ProductSchema } from "./product.validation";

const router = express.Router();

router.post(
  "/product",
  auth("admin"),
  validateRequest(ProductSchema),
  ProductControllers.createProductController
);

router.get("/products",
 ProductControllers.getProductController);

router.put(
  "/products/:productId",
  auth("admin"),
  validateRequest(ProductSchema)  ,
  ProductControllers.updateProductController
);

// router.get(
//   "/products/:courseId/reviews",
//   CourseControllers.getCourseWithReviewsController
// );

// router.get("/course/best", CourseControllers.getBestCourseController);

export const ProductsRoutes = router;
