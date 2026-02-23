import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Role → Routes Configuration
// ---------------------------------------------------------------------------
// Each key is a role, and the value is an array of route prefixes that role
// can access. To add a new role, just add a new entry to this object.
// SUPER_ADMIN has a wildcard ["*"] meaning access to everything.

const roleAccessMap: Record<string, string[]> = {
SUPER_ADMIN: ["*"],
ADMIN: ["/admin", "/dashboard", "/settings", "/applicants", "/jobs/admin"],
EMPLOYEE: ["/dashboard", "/settings"],
APPLICANT: ["/apply", "/settings"],
};

// Routes that don't require authentication at all
const publicRoutes = ["/", "/login", "/register", "/unauthorized"];
const authRoutes = ["/login", "/register"];

// ---------------------------------------------------------------------------
// Helper — check if a role can access a given path
// ---------------------------------------------------------------------------

function canAccess(role: string, pathname: string): boolean {
const allowedRoutes = roleAccessMap[role];
if (!allowedRoutes) return false;
if (allowedRoutes.includes("\*")) return true;
return allowedRoutes.some((route) => pathname.startsWith(route));
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export async function middleware(req: NextRequest) {
const pathname = req.nextUrl.pathname;

// 1. Allow static assets and API routes
if (
pathname.startsWith("/\_next") ||
pathname.startsWith("/api") ||
pathname.includes(".")
) {
return NextResponse.next();
}

// 2. Handle Jobs routes:
// - /jobs/admin and its subpaths are protected
// - /jobs and other sub-paths (like /jobs/123) are public
const lowerPath = pathname.toLowerCase();
const isJobsPath = lowerPath === "/jobs" || lowerPath.startsWith("/jobs/");
const isAdminJobsPath = lowerPath.startsWith("/jobs/admin");

if (isJobsPath && !isAdminJobsPath) {
return NextResponse.next();
}

// 3. Handle Auth Routes (/login, /register)
// If user is already logged in, redirect them away from auth pages
if (authRoutes.includes(pathname)) {
const token = req.cookies.get("refreshToken")?.value;

    if (token) {
      try {
        // Decode the JWT to read the role for UI steering.
        // Full verification is not needed here as the backend will verify on data load.
        const payload = decodeJwt(token);
        const userRole = (payload as any).role as string | undefined;

        if (userRole) {
          const redirectPath =
            userRole === "APPLICANT" ? "/apply" : "/dashboard";
          return NextResponse.redirect(new URL(redirectPath, req.url));
        }
      } catch (error) {
        // If decode fails, just let them see the login page
      }
    }
    return NextResponse.next();

}

// 4. Handle other public routes
if (publicRoutes.includes(pathname)) {
return NextResponse.next();
}

// Read refresh token from httpOnly cookie
const token = req.cookies.get("refreshToken")?.value;

if (!token) {
const loginUrl = new URL("/login", req.url);
loginUrl.searchParams.set("callbackUrl", pathname);
return NextResponse.redirect(loginUrl);
}

try {
// Decoding the JWT for navigation routing.
// The backend handles actual security verification.
const payload = decodeJwt(token);
const userRole = (payload as any).role as string | undefined;

    if (!userRole) {
      return NextResponse.next();
    }

    // Check role access using the role-centric map
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

// ---------------------------------------------------------------------------
// Matcher — skip static files and API routes
// ---------------------------------------------------------------------------

export const config = {
matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
