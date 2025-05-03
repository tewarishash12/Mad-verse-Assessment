import { z } from 'zod';
import { prisma } from '@/server/db';
import { initTRPC } from '@trpc/server';
import { Prisma } from '@prisma/client';

const t = initTRPC.create();

export const pokemonRouter = t.router({
    getOne: t.procedure
        .input(z.string())
        .query(async ({ input }) => {

            const pokemon = await prisma.pokemon.findFirst({
                where: {
                    name: {
                        startsWith: input,
                        mode: 'insensitive', // This makes the query case-insensitive
                    },
                },
                include: {
                    types: {
                        include: {
                            type: true,
                        },
                    },
                },
            });

            if (!pokemon) throw new Error('Pokemon not found');

            const result = {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map((t) => t.type.name),
                sprite: pokemon.sprite,
            };

            console.log('✅ Final response sent:', result);
            return result;
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
                include: {
                    types: {
                        include: {
                            type: true,
                        },
                    },
                },
            });

            const mapped = pokemons.map((p) => ({
                id: p.id,
                name: p.name,
                types: p.types.map((t) => t.type.name),
                sprite: p.sprite,
            }));
            return mapped;
        }),

    getByType: t.procedure
        .input(z.string().optional())
        .query(async ({ input }) => {
            console.log("🧪 [getByType] Input type filter:", input);

            const whereClause = input
                ? {
                    types: {
                        some: {
                            type: {
                                is: {
                                    name: {
                                        equals: input,
                                        mode: Prisma.QueryMode.insensitive, // ✅ This now works with 'is'
                                    },
                                },
                            },
                        },
                    },
                }
                : {};

            console.log("🔍 [getByType] Where clause:", JSON.stringify(whereClause, null, 2));

            const pokemons = await prisma.pokemon.findMany({
                where: whereClause,
                include: {
                    types: {
                        include: {
                            type: true,
                        },
                    },
                },
            });

            console.log("📦 [getByType] Raw DB result:", pokemons);

            const mapped = pokemons.map((p) => ({
                id: p.id,
                name: p.name,
                types: p.types.map((t) => t.type.name),
                sprite: p.sprite,
            }));

            console.log("🗺️ [getByType] Mapped result:", mapped);

            return mapped;
        }),

});
