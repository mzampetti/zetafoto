import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Redirige "/" a "/it"
  if (url.pathname === "/") {
    url.pathname = "/it";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// export const config = {
//    matcher: ['/', '/it/:path*'],
//  };
