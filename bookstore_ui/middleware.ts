import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value || null;

    if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && ( request.nextUrl.pathname === "/cart" || request.nextUrl.pathname === "/my-account" || request.nextUrl.pathname === "/checkout")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}