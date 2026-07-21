import express from "express";


import {

  createOrder,

  getMyOrders,

  getSingleOrder,

  getRestaurantOrders,

  updateOrderStatus,

  cancelOrder

} from "../controllers/orderController.js";


import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";



const router = express.Router();





// ==========================================
// CUSTOMER
// ==========================================


// Create order

router.post(

"/",

protect,

authorize("customer"),

createOrder

);




// Customer orders

router.get(

"/my-orders",

protect,

authorize("customer"),

getMyOrders

);





// Cancel order

router.delete(

"/:id",

protect,

authorize("customer"),

cancelOrder

);







// ==========================================
// RESTAURANT
// ==========================================


// Restaurant gets orders

router.get(

"/restaurant",

protect,

authorize("restaurant"),

getRestaurantOrders

);





// Restaurant updates status

router.put(

"/:id/status",

protect,

authorize("restaurant"),

updateOrderStatus

);







// ==========================================
// COMMON
// ==========================================


// Get single order

router.get(

"/:id",

protect,

getSingleOrder

);




export default router;