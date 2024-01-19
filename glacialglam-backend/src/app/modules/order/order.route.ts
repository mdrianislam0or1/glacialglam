import express from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middleware/auth";
import validateOrderRequest from "./order.validation";

const router = express.Router();

router.post("/addOrder", auth("admin", "user"),
 validateOrderRequest, OrderControllers.addOrderItemsController);


 router.get("/myOrder",
  auth("admin", "user"),
  OrderControllers.getMyOrdersController);


 router.get("/myOrder/:orderId",
  auth("admin", "user"),
 OrderControllers.getOrderByIdController);

router.post('/payment/:orderId',
    // auth("admin", "user"),
OrderControllers.processPaymentController)


// admin start
router.get("/admin/allOrder",
  auth("admin"),
OrderControllers.getOrdersForAdminController);

// delivered order
router.post("/admin/orders/:orderId/deliver",
  auth("admin"),
  OrderControllers.updateOrderDeliveryStatusController);

  // delete order
  router.delete("/admin/orders/:orderId",
  auth("admin"),
  OrderControllers.deleteOrderController);

// admin end


export const OrderRoutes = router;
