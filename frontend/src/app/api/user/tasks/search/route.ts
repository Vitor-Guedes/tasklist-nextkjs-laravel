import { NextRequest } from "next/server";
import { proxyHandle } from "@/services/proxy";

export const GET = async (request: NextRequest) => await proxyHandle(request);