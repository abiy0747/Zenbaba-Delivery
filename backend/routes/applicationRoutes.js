import express from "express";

import {
  createDriverApplication,
  createRestaurantApplication,
  getDriverApplications,
  getRestaurantApplications,
  approveDriverApplication,
  approveRestaurantApplication,
  rejectDriverApplication,
  rejectRestaurantApplication,
} from "../controllers/applicationController.js";


import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
// If you have admin middleware, we will add it later


const router = express.Router();





/*
=====================================
 PUBLIC / USER APPLICATION SUBMIT
=====================================
*/


router.post(
  "/driver",
  protect,
  createDriverApplication
);



router.post(
  "/restaurant",
  protect,
  createRestaurantApplication
);







/*
=====================================
 ADMIN VIEW APPLICATIONS
=====================================
*/


router.get(
 "/drivers",
 protect,
 admin,
 getDriverApplications
);


router.get(
  "/restaurants",
  protect,
  admin,
  getRestaurantApplications
);








/*
=====================================
 ADMIN APPROVE
=====================================
*/


router.put(
  "/driver/:id/approve",
  protect,
  admin,
  approveDriverApplication
);



router.put(
  "/restaurant/:id/approve",
  protect,
  admin,
  approveRestaurantApplication
);







/*
=====================================
 ADMIN REJECT
=====================================
*/


router.put(
  "/driver/:id/reject",
  protect,
  admin,
  rejectDriverApplication
);



router.put(
  "/restaurant/:id/reject",
  protect,
  admin,
  rejectRestaurantApplication
);





export default router;