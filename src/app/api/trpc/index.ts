// server/api/trpc/index.ts
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { pokemonRouter } from './routers/pokemon';

const t = initTRPC.create({
    transformer: superjson, // Enables date and complex object serialization
});

export const appRouter = t.router({
    pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;
