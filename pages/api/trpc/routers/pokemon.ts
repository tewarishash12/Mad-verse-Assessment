// server/api/trpc/routers/pokemon.ts
import { z } from 'zod';
import { prisma } from '../../../../src/server/db';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const pokemonRouter = t.router({
    getOne: t.procedure
        .input(z.string())
        .query(async ({ input }) => {
            console.log('🚀 getOne called with:', input); 
            const pokemon = await prisma.pokemon.findUnique({
                where: { name: input },
                include: { types: true }, // Include related types
            });

            if (!pokemon) throw new Error('Pokemon not found');

            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(t => t.name), // Extract type names
                sprite: pokemon.sprite,
            };
        }),

    getMany: t.procedure
        .input(z.array(z.string()))
        .query(async ({ input }) => {
            const pokemons = await prisma.pokemon.findMany({
                where: {
                    name: {
                        in: input,
                    },
                },
                include: { types: true },
            });

            return pokemons.map(p => ({
                id: p.id,
                name: p.name,
                types: p.types.map(t => t.name),
                sprite: p.sprite,
            }));
        }),

    getByType: t.procedure
        .input(z.string().optional())
        .query(async ({ input }) => {
            const whereClause = input
                ? {
                    types: {
                        some: {
                            name: input,
                        },
                    },
                }
                : {};

            const pokemons = await prisma.pokemon.findMany({
                where: whereClause,
                include: { types: true },
            });

            return pokemons.map(p => ({
                id: p.id,
                name: p.name,
                types: p.types.map(t => t.name),
                sprite: p.sprite,
            }));
        }),
});
