import { NextResponse } from "next/server";
import {
  loginUserSchema,
  userLoginResponseSchema,
} from "@repo/shared/src/users";

import { AUTH_COOKIE_NAME, LOGIN_ENDPOINT, getAuthCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const validatedBody = loginUserSchema.safeParse(body);
  if (!validatedBody.success) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 400 },
    );
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

      return NextResponse.json({ message }, { status: response.status });
    }

    const parsedLoginResponse = userLoginResponseSchema.safeParse(payload);
    if (!parsedLoginResponse.success) {
      return NextResponse.json(
        { message: "Unexpected login response. Please try again." },
        { status: 500 },
      );
    }

    const nextResponse = NextResponse.json({ ok: true });
    nextResponse.cookies.set(
      AUTH_COOKIE_NAME,
      parsedLoginResponse.data.token,
      getAuthCookieOptions(),
    );

    return nextResponse;
  } catch {
    return NextResponse.json(
      { message: "Unable to connect to the server. Please try again." },
      { status: 500 },
    );
  }
}
