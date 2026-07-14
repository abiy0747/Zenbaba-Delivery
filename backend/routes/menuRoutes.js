import express from "express";

import {

createMenuItem,
getMenuItems,
getMyMenu,
getMenuItemById,
updateMenuItem,
deleteMenuItem

}
from "../controllers/menuController.js";


import protect from "../middleware/authMiddleware.js";


const router = express.Router();



// Restaurant create

router.post(
"/",
protect,
createMenuItem
);



// IMPORTANT
// keep this before /:id

router.get(
"/my-menu",
protect,
getMyMenu
);



// Public menu

router.get(
"/",
getMenuItems
);



router.get(
"/:id",
getMenuItemById
);



router.put(
"/:id",
protect,
updateMenuItem
);



router.delete(
"/:id",
protect,
deleteMenuItem
);



export default router;