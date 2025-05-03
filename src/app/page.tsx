'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#f8f5f0', // Soft neutral background like book pages
        minHeight: '100vh',
        color: '#1A237E',
        fontFamily: 'serif',
      }}
    >
      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          color: '#B71C1C', // Deep red for Pokédex feel
          marginBottom: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '1px 1px #fff',
        }}
      >
        Welcome to the Pokédex!
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h5"
        sx={{
          color: '#3E2723',
          marginBottom: '50px',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        Choose your next chapter:
      </Typography>

      {/* Action Buttons */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Button
          variant="contained"
          component={Link}
          href="/pokemon"
          sx={{
            backgroundColor: '#B71C1C',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            width: '250px',
            '&:hover': {
              backgroundColor: '#7f0000',
            },
          }}
        >
          Get a Pokémon
        </Button>
        <Button
          variant="contained"
          component={Link}
          href="/pokedex"
          sx={{
            backgroundColor: '#B71C1C',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            width: '250px',
            '&:hover': {
              backgroundColor: '#7f0000',
            },
          }}
        >
          View Pokédex
        </Button>
        <Button
          variant="contained"
          component={Link}
          href="/filterable-pokedex"
          sx={{
            backgroundColor: '#B71C1C',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            width: '250px',
            '&:hover': {
              backgroundColor: '#7f0000',
            },
          }}
        >
          Filter by Type
        </Button>
      </Box>
    </Box>
  );
}
