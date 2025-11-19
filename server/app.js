import { createServer } from "node:http";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/configs/db.config.js";

config();

connectDB();

const PORT = 5000;

const app = express();

const server = createServer(app);

app.use(cors("*"));

server.listen(PORT, () => {
  console.log(`Server is 🏃 at ${PORT}`);
});
