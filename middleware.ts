// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLogin = req.cookies.get("token"); // Check if the token cookie exists
  if (isLogin) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/"], // Apply middleware to the root path
};
