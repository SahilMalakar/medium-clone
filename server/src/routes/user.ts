import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";

const userRouter:Router = Router();

userRouter.post("/signup",signUp);
userRouter.post("/signin",signIn)

export { userRouter };