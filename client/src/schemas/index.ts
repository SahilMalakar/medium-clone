import { z } from "zod";

//runtime validator
//Used when you want to validate incoming data (req.body, form data, etc.)
//So it actually runs during execution and checks
export const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string().min(3).max(20),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(20),
});

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

//compile-time check
//Used when you want type safety in code.
export type SignUpTypes = z.infer<typeof signupSchema>;

export type SignInTypes = z.infer<typeof signinSchema>;

export type blogTypes = z.infer<typeof blogSchema>;
