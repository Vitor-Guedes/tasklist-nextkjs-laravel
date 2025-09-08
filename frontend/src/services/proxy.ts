import { NextRequest, NextResponse } from "next/server";

export async function proxy(url: string, configs:any = {}) {
    return await fetch(url, configs);
}

export async function proxyBackend(url: string, token: string, configs: any = {}) {
    const completeUrl = url.replace("http://localhost:3000", process.env.API_BACKEND as string);

    configs.headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": process.env.API_USER_AGENT as string,
        "Authorization": "Bearer " + token
    };

    return await fetch(completeUrl, configs);
}

export async function proxyHandle(request: NextRequest, configs: any = {}) {
    const token = request.cookies.get(process.env.TOKEN_KEY as string)?.value;

    const response = await proxyBackend(request.url, token as string, configs);
    const json = await response.json();

    return NextResponse.json(json, { status: response.status });
}