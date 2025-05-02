// lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../pages/api/trpc'; // adjust this path as needed

export const trpc = createTRPCReact<AppRouter>();
