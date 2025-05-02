// server/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
    // Allow global Prisma client reuse in dev
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
