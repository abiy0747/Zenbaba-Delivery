import express from "express";

import {
  getAvailableDeliveries,
  acceptDelivery,
  getMyDeliveries,
  pickUpDelivery,
  startDelivery,
  completeDelivery,
  getAllDeliveries
} from "../controllers/deliveryController.js";


import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
updateDriverLocation
}
from "../controllers/locationController.js";

const router = express.Router();



// Driver available deliveries

router.get(
"/available",
protect,
authorize("driver"),
getAvailableDeliveries
);




// Driver accept delivery

router.put(
"/:deliveryId/accept",
protect,
authorize("driver"),
acceptDelivery
);




// Driver own deliveries

router.get(
"/my",
protect,
authorize("driver"),
getMyDeliveries
);




// Pickup

router.put(
"/:deliveryId/pickup",
protect,
authorize("driver"),
pickUpDelivery
);




// Start delivery

router.put(
"/:deliveryId/start",
protect,
authorize("driver"),
startDelivery
);




// Complete

router.put(
"/:deliveryId/complete",
protect,
authorize("driver"),
completeDelivery
);




// Admin

router.get(
"/all",
protect,
authorize("admin"),
getAllDeliveries
);

router.put(

"/location",

protect,

updateDriverLocation

);


export default router;