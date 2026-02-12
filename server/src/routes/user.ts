import { Router } from "express";
import { signUp } from "../controllers/auth.js";

const userRouter:Router = Router();

userRouter.post("/signup",signUp);
// userRouter.post("/signin")

export { userRouter };