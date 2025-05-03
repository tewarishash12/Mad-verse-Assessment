'use client';

import React from 'react';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import superjson from 'superjson';
import { trpc } from '@/lib/trpc';

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            transformer: superjson,
            url: '/api/trpc',
        }),
    ],
});

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};
