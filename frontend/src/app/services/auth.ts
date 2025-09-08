import jwt from 'jsonwebtoken';

export function isValidToken (token: string|null): boolean {
    if (! token) {
        return false;
    }

    const decoded = jwt.decode(token);
    const origin = new URL(decoded.iss);
    const backend = new URL(process.env.NEXT_PUBLIC_API_BACKEND as string);
    const now = Date.now() / 1000;

    return decoded.exp > now && origin.hostname === backend.hostname;
};