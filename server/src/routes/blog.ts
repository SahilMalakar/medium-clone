import { Router } from "express";
import authHandler from "../middlewares/authHandler.js";
import {
  createUserBlog,
  getAllBlog,
  getUserBlog,
  updateUserBlog,
} from "../controllers/userBlog.js";
const blogRouter: Router = Router();

blogRouter.post("/", authHandler, createUserBlog);
blogRouter.put("/:id", authHandler, updateUserBlog);
blogRouter.get("/bulk", authHandler, getAllBlog);
blogRouter.get("/:id", authHandler, getUserBlog);

export { blogRouter };
