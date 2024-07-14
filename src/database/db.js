import { MONGO_URI } from "../utils/constants.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    return connection;
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error}`, {
      service: "Database Connection",
    });
    process.exit(1);
  }
};

// Graceful shutdown on SIGINT
process.on("SIGINT", () => {
  mongoose.connection.close().finally(() => {
    logger.info("MongoDB Disconnected", {
      service: "Database",
    });
    process.exit(0);
  });
});

export default connectDb;
