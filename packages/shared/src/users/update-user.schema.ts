import { z } from "zod/v4";
import { createUserSchema } from "./create-user.schema";

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
