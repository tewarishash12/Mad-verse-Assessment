import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { pokemonRouter } from './routers/pokemon';

const t = initTRPC.create({
    transformer: superjson,
});

export const appRouter = t.router({
    pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;
