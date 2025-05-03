import { z } from 'zod';
import { prisma } from '@/server/db';
import { initTRPC } from '@trpc/server';
import { Prisma } from '@prisma/client';

const t = initTRPC.create();

export const pokemonRouter = t.router({
    getOne: t.procedure
        .input(z.string())
        .query(async ({ input }) => {

            const pokemons = await prisma.pokemon.findMany({
                where: {
                    name: {
                        startsWith: input,
                        mode: 'insensitive', 
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

            if (!pokemons) throw new Error('Pokemon not found');

            const result = pokemons.map((pokemon) => ({
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map((t) => t.type.name),
                sprite: pokemon.sprite,
            }));
            
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

            const whereClause = input
                ? {
                    types: {
                        some: {
                            type: {
                                is: {
                                    name: {
                                        equals: input,
                                        mode: Prisma.QueryMode.insensitive, 
                                    },
                                },
                            },
                        },
                    },
                }
                : {};

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

            const mapped = pokemons.map((p) => ({
                id: p.id,
                name: p.name,
                types: p.types.map((t) => t.type.name),
                sprite: p.sprite,
            }));

            return mapped;
        }),

});
