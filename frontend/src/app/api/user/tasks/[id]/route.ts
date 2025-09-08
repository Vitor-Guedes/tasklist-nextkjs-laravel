import { NextRequest } from "next/server";
import { proxyHandle } from "@/services/proxy";

export const GET = async (request: NextRequest) => await proxyHandle(request);

export const DELETE = async(request: NextRequest) => await proxyHandle(request, { method: "DELETE" });

export const PUT = async (request: NextRequest) => 
        await proxyHandle(request, {
            method: "PUT",
            body: JSON.stringify(await request.json()) 
        }
    );