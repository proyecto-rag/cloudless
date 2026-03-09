export const AUTH_COOKIE_NAME = "cloudless_session";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const LOGIN_ENDPOINT = `${API_BASE_URL}/api/users/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/api/users`;
export const AUTH_STATUS_ENDPOINT = `${API_BASE_URL}/api/users/auth-status`;

export const getAuthCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
});
