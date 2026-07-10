import express from "express";

import {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// Public Routes
router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);


// Restaurant Routes
router.post(
  "/",
  protect,
  authorize("restaurant"),
  createMenuItem
);

router.put(
  "/:id",
  protect,
  authorize("restaurant"),
  updateMenuItem
);

router.delete(
  "/:id",
  protect,
  authorize("restaurant"),
  deleteMenuItem
);

export default router;