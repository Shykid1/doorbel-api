import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "./src/utils/logger.js";
import connectDb from "./src/database/db.js";

dotenv.config();

// Initialize express
const app = express();

// connect to db  and start server
connectDb().then((connection) => {
  logger.info(`MongoDB Connected: ${connection.host}`, {
    service: "Database Connection",
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Rejection: ${error.message}`);
  process.exit(1);
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
