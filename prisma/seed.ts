import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const types = ['grass', 'fire', 'water', 'electric', 'bug'];
    const typeMap: Record<string, { id: number }> = {};

    // Step 1: Create types
    for (const typeName of types) {
        const type = await prisma.type.create({
            data: { name: typeName },
        });
        typeMap[typeName] = { id: type.id };  // Correct way to store type IDs
    }

    // Step 2: Create Pokémon
    await prisma.pokemon.createMany({
        data: [
            {
                name: 'Bulbasaur',
                sprite: 'https://pokemon.com/pictures/bulbasaur.png',
            },
            {
                name: 'Charmander',
                sprite: 'https://pokemon.com/pictures/charmander.png',
            },
            {
                name: 'Squirtle',
                sprite: 'https://pokemon.com/pictures/squirtle.png',
            },
        ],
    });

    // Step 3: Retrieve created Pokémon
    const bulbasaur = await prisma.pokemon.findUnique({ where: { name: 'Bulbasaur' } });
    const charmander = await prisma.pokemon.findUnique({ where: { name: 'Charmander' } });
    const squirtle = await prisma.pokemon.findUnique({ where: { name: 'Squirtle' } });

    // Step 4: Create PokemonType join records manually
    if (bulbasaur) {
        await prisma.pokemonType.create({
            data: {
                pokemonId: bulbasaur.id,
                typeId: typeMap['grass'].id, // Ensure you're using the correct type ID
            },
        });
    }

    if (charmander) {
        await prisma.pokemonType.create({
            data: {
                pokemonId: charmander.id,
                typeId: typeMap['fire'].id,
            },
        });
    }

    if (squirtle) {
        await prisma.pokemonType.create({
            data: {
                pokemonId: squirtle.id,
                typeId: typeMap['water'].id,
            },
        });
    }

    console.log('✅ Seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
