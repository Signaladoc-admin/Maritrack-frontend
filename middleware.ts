import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
import type { NextRequest } from "next/server";

// Role → Routes Configuration
const roleAccessMap: Record<string, string[]> = {
  ADMIN: ["*"], // Admin has access to everything for now
  USER: ["/dashboard", "/settings", "/onboarding", "onboarding/personal"],
};

// Routes that don't require authentication at all
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/unauthorized",
  "/register/personal",
  "/register/business",
  "/confirm-email",
  "/components",
  "/components-showcase",
];
const authRoutes = [
  "/login",
  "/register",
  "/register/personal",
  "/register/business",
  "/confirm-email",
];

function canAccess(role: string, pathname: string): boolean {
  const allowedRoutes = roleAccessMap[role];
  if (!allowedRoutes) return false;
  if (allowedRoutes.includes("*")) return true;
  return allowedRoutes.some((route) => pathname.startsWith(route));
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Allow static assets and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Handle Auth Routes (/login, /register)
  if (authRoutes.includes(pathname)) {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const accessToken = req.cookies.get("accessToken")?.value;

    if (refreshToken || accessToken) {
      try {
        // Try to get role from access token first, then fallback to refresh token
        const tokenToDecode = accessToken || refreshToken;
        const payload = decodeJwt(tokenToDecode as string);
        const userRole = (payload as any).role as string | undefined;

        const redirectPath = userRole === "ADMIN" ? "/admin" : "/dashboard";
        return NextResponse.redirect(new URL(redirectPath, req.url));
      } catch (error) {
        // If decoding fails but we have tokens, still redirect to a safe default
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  // 3. Handle other public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 4. Protect all other routes
  const token = req.cookies.get("refreshToken")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = decodeJwt(token);
    const userRole = (payload as any).role as string | undefined;

    if (!userRole) {
      return NextResponse.next();
    }

    if (!canAccess(userRole, pathname)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error: any) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
