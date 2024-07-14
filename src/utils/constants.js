import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE;

export const CORSOPTIONS = {
  origin: process.env.CORSORIGIN || "http://localhost:5173",
  credentials: true,
};
