// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "./app/services/auth";

export function middleware(request: NextRequest) {
    const token = request.cookies.get(process.env.TOKEN_KEY as string)?.value;

    if (isValidToken(token as string)) {
        console.log(request.nextUrl)
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL("/user", request.url));
        }

        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: [
        "/",
        "/user",
        "/user/tasks/:path"
    ]
};
