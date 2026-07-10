import express from "express";

import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const router = express.Router();


// Create restaurant (restaurant owner only)
router.post(
  "/",
  protect,
  authorize("restaurant"),
  createRestaurant
);


// Get all restaurants (public)
router.get(
  "/",
  getRestaurants
);

router.get(
  "/:id",
  getRestaurantById
);

 router.put(
  "/:id",
  protect,
  authorize("restaurant"),
  updateRestaurant
);

router.delete(
  "/:id",
  protect,
  authorize("restaurant"),
  deleteRestaurant
);

export default router;