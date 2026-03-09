"use server";

import { redirect } from "next/navigation";
import { createUserSchema } from "@repo/shared/src/users";

import { REGISTER_ENDPOINT } from "@/lib/auth";

export type RegisterFormState = {
  message?: string;
  fieldErrors?: {
    username?: string;
    email?: string;
    password?: string;
  };
};

export async function registerAction(
  _previousState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const validatedBody = createUserSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedBody.success) {
    const fieldErrors = validatedBody.error.flatten().fieldErrors;

    return {
      message: "Please review the highlighted fields.",
      fieldErrors: {
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedBody.data),
      cache: "no-store",
    });

    if (!response.ok) {
      const message =
        response.status === 409
          ? "Username already exists"
          : "We could not complete your registration. Please try again.";
      return {
        message,
      };
    }

    redirect("/login?registered=1");
  } catch {
    return { message: "Unable to connect to the server. Please try again." };
  }
}
