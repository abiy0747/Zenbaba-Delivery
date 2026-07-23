import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


import connectDB from "./config/db.js";

import errorMiddleware from "./middleware/errorMiddleware.js";



import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";


dotenv.config();



// Connect MongoDB

connectDB();




// Express app

const app = express();





// ============================
// CREATE HTTP SERVER
// ============================


const server = http.createServer(app);





// ============================
// SOCKET.IO CONFIG
// ============================


const io = new Server(server,{


cors:{


origin:"http://localhost:3000",

methods:[
"GET",
"POST"
]


}


});





// ============================
// SOCKET CONNECTION
// ============================


io.on(
"connection",
(socket)=>{


console.log(
"🟢 Socket connected:",
socket.id
);





socket.on(
"joinDelivery",
(deliveryId)=>{


socket.join(deliveryId);



console.log(
"📍 Driver tracking room joined:",
deliveryId
);



});






socket.on(
"disconnect",
()=>{


console.log(
"🔴 Socket disconnected:",
socket.id
);


});


}

);





// Make Socket.IO available in controllers

app.set(
"io",
io
);








// ============================
// MIDDLEWARE
// ============================


app.use(cors());


app.use(express.json());







// ============================
// ROUTES
// ============================


app.use(
"/api/auth",
authRoutes
);



app.use(
"/api/restaurants",
restaurantRoutes
);



app.use(
"/api/menu",
menuRoutes
);



app.use(
"/api/cart",
cartRoutes
);



app.use(
"/api/orders",
orderRoutes
);



app.use(
"/api/delivery",
deliveryRoutes
);



app.use(
"/api/drivers",
driverRoutes
);


app.use(
  "/api/applications",
  applicationRoutes
);








// ============================
// ERROR HANDLER
// ============================


app.use(
errorMiddleware
);









// ============================
// TEST ROUTE
// ============================


app.get(
"/",
(req,res)=>{


res.send(
"Welcome to Zenbaba Backend 🚀"
);


}

);








// ============================
// START SERVER
// ============================


const PORT = process.env.PORT || 5000;



server.listen(
PORT,
()=>{


console.log(
`🚀 Server running on port ${PORT}`
);


}
);