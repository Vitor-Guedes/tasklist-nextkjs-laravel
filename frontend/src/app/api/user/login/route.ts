import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const response = await fetch(process.env.API_BACKEND + '/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": process.env.API_USER_AGENT as string
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (! response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        const _response = NextResponse.json(data, { status: 200 });
        _response.cookies.set(
            process.env.TOKEN_KEY as string, 
            data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: data.expire_in - 60,
            }
        );

        return _response;
    } catch (error) {
        const _response = NextResponse.json({
            message: "Algo deu errado. Tenete novamento mais tarde"
        }, { status: 500 });

        return _response;
    }
}