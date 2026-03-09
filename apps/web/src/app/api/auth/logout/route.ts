import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, getAuthCookieOptions } from "@/lib/auth";

export async function POST() {
  const nextResponse = NextResponse.json({ ok: true });

  nextResponse.cookies.set(AUTH_COOKIE_NAME, "", {
    ...getAuthCookieOptions(),
    maxAge: 0,
  });

  return nextResponse;
}
