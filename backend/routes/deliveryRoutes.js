import express from "express";
import {
  assignDriver,
  getMyDeliveries,
  updateDeliveryStatus,
  getAllDeliveries,
} from "../controllers/deliveryController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

// Admin
router.post(
  "/assign",
  protect,
  authorize("admin"),
  assignDriver
);
router.get("/", protect, getAllDeliveries);

// Driver
router.get("/my-deliveries", protect, getMyDeliveries);
router.put("/:id/status", protect, authorize("driver"), updateDeliveryStatus);

export default router;