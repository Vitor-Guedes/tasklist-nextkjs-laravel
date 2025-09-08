import { NextRequest } from "next/server";
import { proxyHandle } from "@/services/proxy";

export const GET = async (request: NextRequest) => await proxyHandle(request);

export const POST = async (request: NextRequest) => 
        await proxyHandle(request, {
            method: "POST",
            body: JSON.stringify(await request.json()) 
        }
    );