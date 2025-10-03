import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value || null;

    if (token && request.nextUrl.pathname === "/login" || token && request.nextUrl.pathname === "/register") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}