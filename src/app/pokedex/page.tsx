// app/pokedex/page.tsx
'use client';

import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { trpc } from '@/lib/trpc';
import { PokedexTable } from '@/components/PokedexTable';

export default function MultiplePokemonPage() {
    const [input, setInput] = useState('');
    const [names, setNames] = useState<string[] | null>(null);

    const { data, isLoading } = trpc.pokemon.getMany.useQuery(names!, {
        enabled: !!names,
    });

    return (
        <Box>
            <TextField
                fullWidth
                label="Enter Pokémon Names (comma-separated)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={() => setNames(input.split(',').map(s => s.trim()))}>
                Fetch
            </Button>

            <Box mt={4}>
                {isLoading && <p>Loading...</p>}
                {data && <PokedexTable pokemonList={data} />}
            </Box>
        </Box>
    );
}
