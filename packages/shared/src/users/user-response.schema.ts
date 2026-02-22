import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(['user', 'admin']),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

export const userLoginResponseSchema = z.object({
  user: userResponseSchema,
  token: z.string(),
});

export type UserLoginResponse = z.infer<typeof userLoginResponseSchema>;

export const userAuthStatusSchema = z.object({
  email: z.string(),
  username: z.string(),
  token: z.string(),
});

export type UserAuthStatus = z.infer<typeof userAuthStatusSchema>;
