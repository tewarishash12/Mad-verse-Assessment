'use client';

import { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { trpc } from '@/lib/trpc';
import { PokedexTable } from '@/components/PokedexTable';

export default function MultiplePokemonPage() {
    const [input, setInput] = useState('');
    const [names, setNames] = useState<string[] | null>(null);

    const { data, isLoading } = trpc.pokemon.getMany.useQuery(names!, {
        enabled: !!names,
    });

    return (
        <Box
            sx={{
                padding: '40px',
                backgroundColor: '#f8f5f0', // Book-page like background
                minHeight: '100vh',
                fontFamily: 'serif',
                color: '#1A237E', // Deep blue for text
            }}
        >
            {/* Title/Header */}
            <h1
                style={{
                    textAlign: 'center',
                    color: '#B71C1C',
                    fontSize: '3rem',
                    marginBottom: '40px',
                    fontWeight: 700,
                    textShadow: '1px 1px #fff',
                }}
            >
                Pokédex Multi-Search
            </h1>

            {/* Centered Input & Button Wrapper */}
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
            >
                <TextField
                    fullWidth
                    label="Enter Pokémon Names (comma-separated)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sx={{
                        marginBottom: '20px',
                        backgroundColor: '#fff',
                        '& .MuiInputLabel-root': {
                            color: '#1A237E',
                        },
                        '& .MuiOutlinedInput-root': {
                            color: '#000',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#B71C1C',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    }}
                />
                <Button
                    sx={{
                        mt: 2,
                        backgroundColor: '#B71C1C',
                        color: '#fff',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#7f0000',
                        },
                    }}
                    variant="contained"
                    onClick={() => setNames(input.split(',').map((s) => s.trim()))}
                >
                    Fetch Pokémon
                </Button>

                {/* Loading and Table Output */}
                <Box mt={6}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    ) : (
                        data && <PokedexTable pokemonList={data} />
                    )}
                </Box>
            </Box>
        </Box>
    );
}
