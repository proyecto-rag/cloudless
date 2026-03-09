import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { userAuthStatusSchema } from "@repo/shared/src/users";

import { AUTH_COOKIE_NAME, AUTH_STATUS_ENDPOINT } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const response = await fetch(AUTH_STATUS_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await response.json();
    const parsedPayload = userAuthStatusSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
