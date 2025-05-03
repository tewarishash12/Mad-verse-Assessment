// seed.ts

import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const rawData = fs.readFileSync('pokemon.json', 'utf-8');
    const pokedex = JSON.parse(rawData);

    const typeSet = new Set<string>();
    for (const pokemon of pokedex) {
        pokemon.types.forEach((type: string) => typeSet.add(type));
    }
    const types = Array.from(typeSet);

    const typeMap: Record<string, number> = {};
    for (const typeName of types) {
        const type = await prisma.type.create({
            data: { name: typeName },
        });
        typeMap[typeName] = type.id;
    }

    for (const pokemon of pokedex) {
        const createdPokemon = await prisma.pokemon.create({
            data: {
                id: pokemon.natdex,
                name: pokemon.name,
                sprite: pokemon.sprite,
            },
        });

        for (const typeName of pokemon.types) {
            await prisma.pokemonType.create({
                data: {
                    pokemonId: createdPokemon.id,
                    typeId: typeMap[typeName],
                },
            });
        }
    }

    console.log('✅ All Pokémon seeded successfully');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
