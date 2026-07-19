import express from "express";

import {
  assignDriver,
  getMyDeliveries,
  updateDeliveryStatus,
  getAllDeliveries,
  getAvailableDeliveries,
  acceptDelivery
} from "../controllers/deliveryController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";


const router = express.Router();




// Driver available deliveries

router.get(

"/available",

protect,

authorize("driver"),

getAvailableDeliveries

);






// Driver accepts delivery

router.post(

"/accept/:id",

protect,

authorize("driver"),

acceptDelivery

);

// Driver available deliveries

router.get(
"/available",
protect,
authorize("driver"),
getAvailableDeliveries
);



// Driver accepts delivery

router.post(
"/accept/:id",
protect,
authorize("driver"),
acceptDelivery
);



export default router;