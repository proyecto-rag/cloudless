import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6)
  .max(50)
  .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "The password must have a Uppercase, lowercase letter and a number",
  });

export const createUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.email("Please provide a valid email address"),
  password: passwordSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
