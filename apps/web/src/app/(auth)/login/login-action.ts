"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  loginUserSchema,
  userLoginResponseSchema,
} from "@repo/shared/src/users";

import {
  AUTH_COOKIE_NAME,
  LOGIN_ENDPOINT,
  getAuthCookieOptions,
} from "@/lib/auth";
import { z } from "zod/v4";
export type LoginFormState = {
  message?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
};

export async function loginAction(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const validatedBody = loginUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedBody.success) {
    const fieldErrors = z.treeifyError(validatedBody.error);

    return {
      message: "Invalid email or password.",
      fieldErrors: {
        email: fieldErrors.properties?.email?.errors?.[0],
        password: fieldErrors.properties?.password?.errors?.[0],
      },
    };
  }

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedBody.data),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        response.status === 400 || response.status === 401
          ? "Invalid email or password."
          : "We could not complete your login. Please try again.";

      return { message };
    }

    const parsedLoginResponse = userLoginResponseSchema.safeParse(payload);
    if (!parsedLoginResponse.success) {
      return { message: "Unexpected login response. Please try again." };
    }

    const cookieStore = await cookies();
    cookieStore.set(
      AUTH_COOKIE_NAME,
      parsedLoginResponse.data.token,
      getAuthCookieOptions(),
    );

    redirect("/");
  } catch {
    return { message: "Unable to connect to the server. Please try again." };
  }
}
