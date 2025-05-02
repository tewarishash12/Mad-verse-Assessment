// lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/api/trpc'; // adjust this path as needed

export const trpc = createTRPCReact<AppRouter>();
