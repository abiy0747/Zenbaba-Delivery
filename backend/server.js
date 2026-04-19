import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected 🚀"))
  .catch((err) => console.log("Connection error ❌", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working perfectly 🚀" });
});

app.use(express.json());
app.use("/api/auth", authRoutes);