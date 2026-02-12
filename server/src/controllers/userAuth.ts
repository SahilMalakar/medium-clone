import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

//signup controller
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

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "User signed up successfully",
      token,
    });
  } catch (err: any) {
    err.statusCode = 400;
    err.message = "failed to create user";
    next(err);
  }
};

//signin controller
const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(20),
});

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { data, success, error } = signInSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "validation error",
      errors: error.issues,
    });
  }

  try {
    const { email, password } = data;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err: any) {
    err.statusCode = 500;
    err.message = "failed to login user";
    next(err);
  }
};

export { signUp,signIn };
