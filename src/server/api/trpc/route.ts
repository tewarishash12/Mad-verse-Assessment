// src/app/api/trpc/route.ts
import { appRouter } from '@/server/api/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

console.log('API route is being hit'); 

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => ({}),
    });

export { handler as GET, handler as POST };
