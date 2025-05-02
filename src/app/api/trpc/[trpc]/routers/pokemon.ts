import { z } from 'zod';
import { prisma } from '@/server/db';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const pokemonRouter = t.router({
    getOne: t.procedure
        .input(z.string())
        .query(async ({ input }) => {
            const pokemon = await prisma.pokemon.findUnique({
                where: { name: input },
                include: { types: { include: { type: true } } }, 
            });

            if (!pokemon) throw new Error('Pokemon not found');

            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(t => t.type.name), // Access 'type.name'
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
                include: { types: { include: { type: true } } }, // Include the 'type' relation
            });

            return pokemons.map(p => ({
                id: p.id,
                name: p.name,
                types: p.types.map(t => t.type.name), // Access 'type.name'
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
                            type: { name: input }, // Query 'type' name
                        },
                    },
                }
                : {};

            const pokemons = await prisma.pokemon.findMany({
                where: whereClause,
                include: { types: { include: { type: true } } }, // Include the 'type' relation
            });

            return pokemons.map(p => ({
                id: p.id,
                name: p.name,
                types: p.types.map(t => t.type.name), // Access 'type.name'
                sprite: p.sprite,
            }));
        }),
});
