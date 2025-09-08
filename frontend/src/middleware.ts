// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isValidToken } from "./services/auth";

export function middleware(request: NextRequest) {
    const token = request.cookies.get(process.env.TOKEN_KEY as string)?.value;

    console.log(request.headers.get('referer'));

    if (isValidToken(token as string)) {
        // se tiver token valido - redirect para dashboard
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL("/user", request.url));
        }

        return NextResponse.next();
    }

    // se não tiver logado e mantem na pagina de login
    if (request.nextUrl.pathname === '/') {
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
