// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const types = ['grass', 'fire', 'water', 'electric', 'bug'];

    const typeMap = {} as Record<string, { id: number }>;

    // Create types
    for (const typeName of types) {
        const type = await prisma.type.create({
            data: { name: typeName },
        });
        typeMap[typeName] = type;
    }

    // Create Pokémon
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

    const bulbasaur = await prisma.pokemon.findUnique({ where: { name: 'Bulbasaur' } });
    const charmander = await prisma.pokemon.findUnique({ where: { name: 'Charmander' } });
    const squirtle = await prisma.pokemon.findUnique({ where: { name: 'Squirtle' } });

    // Connect types manually (due to M:N relation)
    if (bulbasaur) {
        await prisma.pokemon.update({
            where: { id: bulbasaur.id },
            data: {
                types: {
                    connect: [{ id: typeMap['grass'].id }],
                },
            },
        });
    }

    if (charmander) {
        await prisma.pokemon.update({
            where: { id: charmander.id },
            data: {
                types: {
                    connect: [{ id: typeMap['fire'].id }],
                },
            },
        });
    }

    if (squirtle) {
        await prisma.pokemon.update({
            where: { id: squirtle.id },
            data: {
                types: {
                    connect: [{ id: typeMap['water'].id }],
                },
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
