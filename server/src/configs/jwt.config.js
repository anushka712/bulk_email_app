import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const JWT_SECRET = process.env.JWT_SECRET;
export const generateAccessToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
