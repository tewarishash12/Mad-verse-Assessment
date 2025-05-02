// app/pokemon/page.tsx
'use client';

import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { trpc } from '@/lib/trpc';
import { PokemonRow } from '@/components/PokemonRow';

export default function SinglePokemonPage() {
    const [name, setName] = useState('');
    const [queryName, setQueryName] = useState<string | null>(null);

    const { data, isLoading } = trpc.pokemon.getOne.useQuery(queryName!, {
        enabled: !!queryName,
    });

    return (
        <Box>
            <TextField
                label="Enter Pokémon Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginRight: 2 }}
            />
            <Button
                variant="contained"
                onClick={() => setQueryName(name.trim())}
            >
                Fetch
            </Button>

            <Box mt={4}>
                {isLoading && <p>Loading...</p>}
                {data && <PokemonRow pokemon={data} />}
            </Box>
        </Box>
    );
}
