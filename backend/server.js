import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to Zenbaba Backend 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});