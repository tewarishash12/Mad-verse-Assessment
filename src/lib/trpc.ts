// lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../app/api/trpc/[trpc]'; // adjust this path as needed

export const trpc = createTRPCReact<AppRouter>();
