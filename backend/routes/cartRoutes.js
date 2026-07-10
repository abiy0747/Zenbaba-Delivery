import express from "express";

import {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


// All cart routes require login

router.post(
  "/",
  protect,
  addToCart
);


router.get(
  "/",
  protect,
  getMyCart
);


router.put(
  "/:itemId",
  protect,
  updateCartItem
);


router.delete(
  "/:itemId",
  protect,
  removeCartItem
);


router.delete(
  "/",
  protect,
  clearCart
);


export default router;