'use client';

import { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { trpc } from '@/lib/trpc';
import { PokemonRow } from '@/components/PokemonRow';

export default function SinglePokemonPage() {
    const [name, setName] = useState('');
    const [queryName, setQueryName] = useState<string | null>(null);

    const { data, isLoading } = trpc.pokemon.getOne.useQuery(queryName!, {
        enabled: !!queryName,
    });

    return (
        <Box
            sx={{
                padding: '40px',
                backgroundColor: '#f8f5f0', 
                minHeight: '100vh',
                fontFamily: 'serif',
                color: '#1A237E',
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    color: '#B71C1C',
                    fontSize: '3rem',
                    marginBottom: '40px',
                    fontWeight: 'bold',
                    textShadow: '1px 1px #fff',
                }}
            >
                Search for a Pokémon
            </h1>

            <Box
                sx={{
                    maxWidth: 700,
                    margin: '0 auto',
                    padding: 4,
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        label="Enter Pokémon Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            marginRight: 2,
                            '& .MuiInputLabel-root': { color: '#1A237E' },
                            '& .MuiOutlinedInput-root': { color: '#000' },
                            '& .MuiInputBase-root': {
                                backgroundColor: '#fff',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#B71C1C',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#7f0000',
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => setQueryName(name.trim())}
                        sx={{
                            backgroundColor: '#B71C1C',
                            color: '#fff',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#7f0000',
                            },
                        }}
                    >
                        Fetch
                    </Button>
                </Box>

                <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {isLoading ? (
                        <CircularProgress color="secondary" />
                    ) : (
                        data && (
                            <Table sx={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Types</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((pokemon) => (
                                        <PokemonRow key={pokemon.id} pokemon={pokemon} />
                                    ))}
                                </TableBody>
                            </Table>
                        )
                    )}
                </Box>
            </Box>
        </Box>
    );
}
