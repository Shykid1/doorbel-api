import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "./constants";

export const generateToken = (id) => {
  jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};
