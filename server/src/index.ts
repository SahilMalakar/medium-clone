import express from "express";
import cors from "cors";

import {prisma} from "./config/db.js"
import { userRouter } from "./routes/user.js";
import { blogRouter } from "./routes/blog.js";

const app = express();
// Middlewares
app.use(express.json());
app.use(cors());


// Routes
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "ok",
      db: "connected",
      uptime: process.uptime(),
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      db: "disconnected",
    });
  }
});

// Example route
app.get("/users", async (req, res, next) => {
    try {
      console.log("heyyy before db call");
      
      const users = await prisma.user.findMany();
      console.log("heyyy after db call" + users);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});


// all routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/users/blog",blogRouter)

//Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

//Graceful Shutdown 
const shutdown = async () => {
  console.log("🛑 Shutting down...");

  server.close(async () => {
    await prisma.$disconnect();
    console.log("✅ Prisma disconnected");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);