import { QueryClient } from "@tanstack/react-query";

declare global {
    var reactQuery : QueryClient | undefined
}

export const query = globalThis.reactQuery || new QueryClient();

if(process.env.NODE_ENV !== "production") globalThis.reactQuery = query;