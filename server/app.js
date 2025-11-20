import { createServer } from "node:http";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/configs/db.config.js";
import appRouter from "./src/routes/app.router.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

config();

connectDB();

const PORT = 5000;

const app = express();

const server = createServer(app);

app.use(express.json({ limit: "10mb" }));

app.use(cors("*"));

app.use("/api/v1", appRouter);

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is 🏃 at ${PORT}`);
});
