// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";

// type DecodedUser = {
//   id: string;
//   email: string;
//   role: "ADMIN" | "USER";
//   exp?: number;
//   iat?: number;
// };

// const PUBLIC_ROUTES = ["/login", "/register", "/"];
// const AUTH_ROUTES = ["/login", "/register"];

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const token = request.cookies.get("accessToken")?.value;

//   let user: DecodedUser | null = null;

//   if (token) {
//     try {
//       user = jwtDecode<DecodedUser>(token);
//     } catch (error) {
//       user = null;
//     }
//   }

//   // Allow public routes
//   if (PUBLIC_ROUTES.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // Prevent logged-in users from visiting login/register again
//   if (user && AUTH_ROUTES.includes(pathname)) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Protect dashboard routes
//   if (pathname.startsWith("/dashboard")) {
//     if (!user) {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//     }

//     if (!["ADMIN", "USER"].includes(user.role)) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/register",
//     "/dashboard/:path*",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type DecodedUser = {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  exp?: number;
  iat?: number;
};

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  let user: DecodedUser | null = null;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedUser>(token);

      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        user = decoded;
      }
    } catch {
      user = null;
    }
  }

  if (user && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (PUBLIC_ROUTES.includes(pathname) || AUTH_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    if (pathname.startsWith("/dashboard/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/user") && user.role !== "USER") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};