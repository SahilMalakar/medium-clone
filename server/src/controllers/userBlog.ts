import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/db.js";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),

  published: z.boolean().optional(),
});

// CREATE BLOG
export const createUserBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, success, error } = blogSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "validation error in create blog",
      errors: error.issues,
    });
  }

  const { title, content } = data;

  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authorId = Number(req.user.id);

  if (isNaN(authorId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json({
      message: "user blog created successfully",
      blog,
    });
  } catch (err: any) {
    err.statusCode = 400;
    err.message = "failed to create user blog";
    next(err);
  }
};

// UPDATE BLOG
export const updateUserBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, success, error } = blogSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "validation error in update blog",
      errors: error.issues,
    });
  }

  const { title, content } = data;
  const blogId = Number(req.params.id);
  if (!req.user?.id || !blogId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authorId = Number(req.user.id);

  if (isNaN(authorId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const blog = await prisma.blog.update({
      where: {
        id: blogId,
        authorId, // ensures user can update only their own blog
      },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({
      message: "user blog updated successfully",
      blog,
    });
  } catch (err: any) {
    err.statusCode = 400;
    err.message = "failed to update user blog";
    next(err);
  }
};

// GET SINGLE BLOG
export const getUserBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`---------------get single blog ------------`);

  const blogId = Number(req.params.id);
  console.log(typeof blogId);
  console.log(blogId);

  if (isNaN(blogId)) {
    return res.status(400).json({ message: "invalid params" });
  }

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "user blog fetched",
      blog,
    });
  } catch (err: any) {
    err.statusCode = 400;
    err.message = "failed to fetch user blog";
    next(err);
  }
};

// GET ALL BLOGS
// pagination /filter later
export const getAllBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(`---------------get all blogs of all user ------------`);
    const blog = await prisma.blog.findMany({
      orderBy: { id: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "all blog fetched",
      blog,
    });
  } catch (err: any) {
    err.statusCode = 400;
    err.message = "failed to fetch all blog";
    next(err);
  }
};
