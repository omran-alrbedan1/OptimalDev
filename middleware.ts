// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  ...routing,
});

export default function middleware(request: NextRequest) {
  const publicPaths = ["/login", "/register", "/", "/home"];
  const isPublicPath = publicPaths.some(
    (path) =>
      request.nextUrl.pathname.startsWith(path) ||
      request.nextUrl.pathname.startsWith(`/en${path}`) ||
      request.nextUrl.pathname.startsWith(`/ar${path}`)
  );

  if (isPublicPath) {
    return intlMiddleware(request);
  }

  const authToken = request.cookies.get("authData")?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
