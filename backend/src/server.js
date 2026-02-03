import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/db.js";

import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/notes.route.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();

const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.com"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);



app.get("/", (req, res) => {
  res.send("Backend is running ");
});

connectDB();
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});