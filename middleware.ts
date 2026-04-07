import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
import type { NextRequest } from "next/server";

// Route access by platform role
const roleAccessMap: Record<string, string[]> = {
  ADMIN: ["*"], // Admin has access to everything for now
  USER: [
    "/dashboard",
    "/settings",
    "/onboarding",
    "onboarding/personal",
    "/profile",
    "/plans",
    "/child",
    "/device",
    "/users",
  ],
};

// Extra routes only accessible to business accounts (role=USER + businessRole set)
const businessOnlyRoutes = ["/onboarding/business"];

// Routes that don't require authentication at all
const publicRoutes = [
  "/",
  "/unauthorized",
  // Personal auth routes
  "/login",
  "/register",
  "/confirm-email",
  "/forgot-password",
  // Business auth routes
  "/business/login",
  "/business/register",
  "/business/confirm-email",
  "/business/forgot-password",
  "/components",
  "/components-showcase",

  // Test routes: TODO: take out later
  "/settings",
  "/plans",
  "/test",
];
const authRoutes = [
  // Personal auth routes
  "/login",
  "/register",
  "/confirm-email",
  "/forgot-password",
  // Business auth routes
  "/business/login",
  "/business/register",
  "/business/confirm-email",
  "/business/forgot-password",
];

function canAccess(role: string, pathname: string): boolean {
  const allowedRoutes = roleAccessMap[role];
  if (!allowedRoutes) return false;
  if (allowedRoutes.includes("*")) return true;
  return allowedRoutes.some((route) => pathname.startsWith(route));
}

export async function middleware(req: NextRequest) {
  let pathname = req.nextUrl.pathname;

  // Normalize pathname: remove trailing slash except for the root
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  // 1. Allow static assets and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("refreshToken")?.value;
  const accessToken = req.cookies.get("accessToken")?.value;
  const token = accessToken || refreshToken;

  // 2. Handle Auth Routes (/login, /register, etc)
  // These are for GUESTS ONLY. If logged in, redirect home.
  if (authRoutes.includes(pathname)) {
    if (token) {
      try {
        const payload = decodeJwt(token);
        const userRole = (payload as any).role as string | undefined;
        const redirectPath = userRole === "ADMIN" ? "/admin" : "/dashboard";
        return NextResponse.redirect(new URL(redirectPath, req.url));
      } catch (error) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  // 3. Handle public routes (/, /confirm-email, /test, etc)
  if (publicRoutes.includes(pathname)) {
    // SPECIAL CASE: Redirct root "/" based on auth status
    if (pathname === "/") {
      if (token) {
        try {
          const payload = decodeJwt(token);
          const userRole = (payload as any).role as string | undefined;
          const redirectPath = userRole === "ADMIN" ? "/admin" : "/dashboard";
          return NextResponse.redirect(new URL(redirectPath, req.url));
        } catch {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } else {
        // Redirct guest to login
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    return NextResponse.next();
  }

  // 4. Protect all other routes
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = decodeJwt(token);
    const userRole = (payload as any).role as string | undefined;
    const businessRole = (payload as any).businessRole as string | null | undefined;

    if (!userRole) {
      return NextResponse.next();
    }

    // Business-only routes: only accessible to users with a businessRole
    if (businessOnlyRoutes.some((r) => pathname.startsWith(r))) {
      if (!businessRole) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
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
