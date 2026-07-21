import express from "express";

import {
createDriverProfile,
getMyDriverProfile,
updateDriverProfile,
toggleAvailability,
getAllDrivers
}
from "../controllers/driverController.js";


import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const router = express.Router();



// Create driver profile

router.post(
"/profile",
protect,
authorize("driver"),
createDriverProfile
);



// Get my driver profile

router.get(
"/me",
protect,
authorize("driver"),
getMyDriverProfile
);



// Update profile

router.put(
"/profile",
protect,
authorize("driver"),
updateDriverProfile
);



// Frontend uses /status
// so add this route

router.put(
"/status",
protect,
authorize("driver"),
toggleAvailability
);



// Keep old route also

router.put(
"/availability",
protect,
authorize("driver"),
toggleAvailability
);



// Admin

router.get(
"/all",
protect,
authorize("admin"),
getAllDrivers
);



export default router;