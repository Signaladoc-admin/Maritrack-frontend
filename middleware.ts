import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
import type { NextRequest } from "next/server";

// Route access by platform role
const roleAccessMap: Record<string, string[]> = {
  BUSINESS: [
    "/dashboard",
    "/settings",
    "/onboarding/business",
    "/change-password",
    "/profile",
    "/business",
    "/business/*",
    "/team",
    "/team/*",
    "/billing",
    "/billing/*",
    "/users",
    "/users/*",
    "/devices",
    "/devices/*",
    "/plans",
    "/plans/*",
  ],
  PARENT: [
    "/dashboard",
    "/settings",
    "/onboarding/personal",
    "/change-password",
    "/profile",
    "/plans",
    "/plans/*",
    "/child",
    "/child/*",
    "/children",
    "/children/*",
    "/devices/*",
  ],
};

// Extra routes only accessible to business accounts (role=USER + businessRole set)
const businessOnlyRoutes = ["/onboarding/business"];

// Routes that don't require authentication at all
const publicRoutes = [
  "/",
  "/landing",
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

const confirmEmailRoutes = ["/confirm-email", "/business/confirm-email"];

function canAccess(role: string, pathname: string): boolean {
  const allowedRoutes = roleAccessMap[role];
  if (!allowedRoutes) return false;

  return allowedRoutes.some((route) => {
    if (route === "*") return true;

    if (route.endsWith("/*")) {
      const baseRoute = route.slice(0, -2);
      return pathname.startsWith(baseRoute + "/");
    }

    return pathname === route;
  });
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

  // 2. Handle Auth Routes (/login, /register, etc) — guests only
  if (authRoutes.includes(pathname)) {
    if (token) {
      try {
        const payload = decodeJwt(token);
        const userRole = (payload as any).role as string | undefined;
        if (userRole === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));

        // An unverified user's token doesn't grant app access — treat them as a guest
        // so they can freely navigate to /login, /confirm-email, etc.
        const isEmailVerified = req.cookies.get("isEmailVerified")?.value === "true";
        if (!isEmailVerified) return NextResponse.next();

        // Redirect back to the page the user came from, if it's a safe same-origin route
        const referer = req.headers.get("referer");
        if (referer) {
          try {
            const refererUrl = new URL(referer);
            const refererPath = refererUrl.pathname;
            const isSameOrigin = refererUrl.origin === req.nextUrl.origin;
            const isAuthOrPublic =
              authRoutes.includes(refererPath) || publicRoutes.includes(refererPath);

            if (isSameOrigin && !isAuthOrPublic) {
              return NextResponse.redirect(new URL(refererPath, req.url));
            }
          } catch {
            // invalid referer URL — fall through to default
          }
        }

        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch {
        // Invalid/expired token — let the user through to the auth page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 3. Handle public routes
  if (publicRoutes.includes(pathname)) {
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
    const appRole = businessRole ? "BUSINESS" : "PARENT";
    const isOnboarded = req.cookies.get("isOnboarded")?.value === "true";
    const isEmailVerified = req.cookies.get("isEmailVerified")?.value === "true";

    // Invited staff are not the org admin — they have no onboarding to complete
    const isInvited = !!(payload as any).isInvited;

    if (!userRole) return NextResponse.next();

    // 5a. Email verification gate — always allow confirm-email pages through
    if (!isEmailVerified) {
      const confirmEmailPath =
        appRole === "BUSINESS" ? "/business/confirm-email" : "/confirm-email";

      if (confirmEmailRoutes.some((r) => pathname.startsWith(r))) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL(confirmEmailPath, req.url));
    }

    // 5. Onboarding routing — skip entirely for invited business staff
    if (appRole === "BUSINESS" && isInvited) {
      // Fall through to role-based access checks below
    } else if (!isOnboarded) {
      const onboardingPath =
        appRole === "BUSINESS" ? "/onboarding/business" : "/onboarding/personal";

      if (pathname.startsWith(onboardingPath)) {
        // Already on their correct onboarding path — allow through
        return NextResponse.next();
      }

      if (canAccess(appRole, pathname)) {
        // Valid route for this role but not yet onboarded
        return NextResponse.redirect(new URL(onboardingPath, req.url));
      }

      // Unknown or cross-role route — fall through to normal checks below
    }

    if (isOnboarded && pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 6. Business-only route guard
    if (businessOnlyRoutes.some((r) => pathname.startsWith(r))) {
      if (!businessRole) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }

    // 7. Role-based access
    if (!canAccess(appRole, pathname)) {
      const otherRole = appRole === "BUSINESS" ? "PARENT" : "BUSINESS";
      if (canAccess(otherRole, pathname)) {
        // Route belongs to the other role
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      // Unknown route — let Next.js render 404
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
