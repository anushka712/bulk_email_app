import { config } from "dotenv";

config();

import { createServer } from "node:http";
import express from "express";
import { Server as SocketIO } from "socket.io";
import cors from "cors";
import { connectDB } from "./src/configs/db.config.js";
import appRouter from "./src/routes/app.router.js";
import errorMiddleware from "./src/middlewares/errorMiddleWare.js";
import { connectQueue } from "./src/queue/producer.js";
import { startConsumer } from "./src/queue/consumer.js";

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

const server = createServer(app);

app.use(express.json({ limit: "10mb" }));

app.use(cors("*"));

app.use("/api/v1", appRouter);

app.use(errorMiddleware);

export const io = new SocketIO(server, {
  cors: { origin: "*" }, 
});

server.listen(PORT, () => {
  console.log(`Server is 🏃 at ${PORT}`);
});

await connectQueue();
await startConsumer();
