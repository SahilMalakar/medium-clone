import { Router } from "express";
import { signIn, signUp } from "../controllers/userAuth.js";

const userRouter:Router = Router();

userRouter.post("/signup",signUp);
userRouter.post("/signin",signIn)

export { userRouter };