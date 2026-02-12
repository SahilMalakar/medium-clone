import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";

const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string().min(3).max(20),
});

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { data, success, error } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "validation error",
      errors: error.issues,
    });
  }
  try {
    const { username, email, password } = data;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      message: "User signed up successfully",
    });
  } catch (err: any) {
    err.statusCode = 400;
    err.message = "failed to create user";
    next(err);
  }
};


export {signUp}