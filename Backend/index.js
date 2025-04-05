import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import predictionRoutes from "./routes/prediction.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/predict", predictionRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Server port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  response.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
