import express from "express";
import {
  registerUser,
  loginUser,
  customerDashboard,
  restaurantDashboard,
  driverDashboard,
  adminDashboard,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
const router = express.Router();

import validate from "../middleware/validate.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";


router.post(
  "/register",
  registerValidator,
  validate,
  registerUser
);


router.post(
  "/login",
  loginValidator,
  validate,
  loginUser
);

router.get(
  "/profile",
  protect,
  (req, res) => {

    res.status(200).json({

      success: true,

      message: "Profile accessed successfully",

      user: req.user,

    });

  }
);

// Customer Only
router.get(
  "/customer",
  protect,
  authorize("customer"),
  customerDashboard
);

// Restaurant Only
router.get(
  "/restaurant",
  protect,
  authorize("restaurant"),
  restaurantDashboard
);

// Driver Only
router.get(
  "/driver",
  protect,
  authorize("driver"),
  driverDashboard
);

// Admin Only
router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminDashboard
);

export default router;

