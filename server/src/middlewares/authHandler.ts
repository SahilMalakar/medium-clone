import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/db.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ msg: "Authorization header missing" });
  }

  const words = authHeader.split(" ");

  if (words.length !== 2 || words[0] !== "Bearer") {
    return res.status(403).json({ msg: "Invalid authorization format" });
  }

  const token = words[1];

  try {
    const decode = jwt.verify(token as string, JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findFirst({
      where: {
        email: decode.email as string,
      },
    });

    if (!user) {
      return res.status(403).json({ msg: "User not found" });
    }

    req.user = decode; // decode contains {id,email}
    next();
  } catch (err: any) {
    err.statusCode = 403;
    err.message = "Invalid or expired token";
    next(err);
  }
};

export default authHandler;
