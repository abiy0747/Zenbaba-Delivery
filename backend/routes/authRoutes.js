import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
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

export default router;