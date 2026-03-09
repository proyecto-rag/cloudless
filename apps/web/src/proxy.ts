import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth";

const protectedPaths = ["/", "/instances", "/settings"];

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/login" && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtectedRoute = protectedPaths.some((path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path),
  );

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/instances/:path*", "/settings/:path*"],
};
