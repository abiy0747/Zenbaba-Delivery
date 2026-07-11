import express from "express";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Customer creates order
router.post(
  "/",
  protect,
  createOrder
);


// Customer views own orders
router.get(
  "/my-orders",
  protect,
  getMyOrders
);


// Restaurant views orders
router.get(
  "/restaurant",
  protect,
  getRestaurantOrders
);


// Get one order
router.get(
  "/:id",
  protect,
  getSingleOrder
);


// Update status
router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);


// Cancel order
router.delete(
  "/:id",
  protect,
  cancelOrder
);

export default router;