import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

// Establish the MongoDB connection (config/db.js)
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "SB Stocks API" });
});

// Routes go here, e.g.:
// import authRoutes from "./routes/authRoutes.js";
// app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SB Stocks server running on port ${PORT}`);
});
