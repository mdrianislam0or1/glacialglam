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

router.post('/payment',
    // auth("admin", "user"),
    OrderControllers.processPaymentController
)


//payment start
router.post("/create-payment-intent/:orderId",
  auth("admin", "user"),
  OrderControllers.createPaymentIntentController);

//payment end


 router.post("/updateOrderToPaid/:orderId",
  auth("admin"),
  OrderControllers.updateOrderToPaidController);

router.post("/updateOrderToDelivered/:orderId",
  auth("admin"),
  OrderControllers.updateOrderToDeliveredController);



export const OrderRoutes = router;
