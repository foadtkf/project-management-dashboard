import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request }); 
  const userProtectedRoutes = ["/", "/projects", "/add-project"];

  if (token == null && userProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
