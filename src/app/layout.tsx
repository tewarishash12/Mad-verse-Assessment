import React from 'react';
import { Inter } from 'next/font/google';
import { CssBaseline, Container } from '@mui/material';
import { TRPCProvider } from "@/components/TRPCProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pokédex App',
  description: 'A Pokédex built with Next.js, tRPC, Prisma, and MUI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <TRPCProvider>
          <Container>
            {children}
          </Container>
        </TRPCProvider>
      </body>
    </html>
  );
}
