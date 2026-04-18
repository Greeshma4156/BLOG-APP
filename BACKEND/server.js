import exp from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { userRoute } from "./APIs/UserApi.js";
import cookieParser from "cookie-parser";
import { adminRoute } from "./APIs/AdminApi.js";
import { authorRoute } from "./APIs/AuthorApi.js";
import { commonRouter } from "./APIs/commonApi.js";
import cors from "cors";

config(); //process.env

//Create express application
const app = exp();

//  CORS Configuration (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173",              // local frontend
      "https://blog-app-wr2a.vercel.app",   // deployed frontend
      "https://blog-app-ruby-nine-73.vercel.app" // new deployed frontend
    ],
    credentials: true
  })
);

//  Middleware
app.use(exp.json());
app.use(cookieParser());

//  Routes
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);

//  Default Route (for testing)
app.get("/", (req, res) => {
  res.send("Blog Backend Running Successfully ");
});

//  Database Connection + Server Start
async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
}

connectDB();

// Global Error Handler
app.use((err, req, res, next) => {
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // Duplicate key error
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // Custom errors
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // Default error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});