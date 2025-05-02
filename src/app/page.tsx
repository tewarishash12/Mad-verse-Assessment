// app/page.tsx
'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Box textAlign="center">
      <Typography variant="h3" gutterBottom>
        Welcome to the Pokédex!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Choose an action below:
      </Typography>

      <Box display="flex" gap={2} justifyContent="center" mt={4}>
        <Button variant="contained" component={Link} href="/pokemon">
          Get a Pokémon
        </Button>
        <Button variant="contained" component={Link} href="/pokedex">
          View Pokedex
        </Button>
        <Button variant="contained" component={Link} href="/filterable-pokedex">
          Filter by Type
        </Button>
      </Box>
    </Box>
  );
}
