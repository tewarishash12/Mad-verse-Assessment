'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { FilterablePokedexTable } from '@/components/FilterablePokedexTable';
import { CircularProgress, Box } from '@mui/material';

export default function FilterablePokedexPage() {
    const [selectedType, setSelectedType] = useState<string | undefined>();

    const { data: filteredPokemon, isLoading } = trpc.pokemon.getByType.useQuery(selectedType);

    return (
        <div
            style={{
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
                    fontWeight: 700,
                    textShadow: '1px 1px #f0e4d7',
                }}
            >
                Pokédex: Type Explorer
            </h1>

            <div
                style={{
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    maxWidth: '960px',
                    margin: '0 auto',
                    border: '1px solid #e0dcdc',
                }}
            >
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                        <CircularProgress color="secondary" size={80} />
                    </Box>
                ) : (
                    <FilterablePokedexTable
                        pokemonList={filteredPokemon ?? []}
                        selectedType={selectedType}
                        selectType={setSelectedType}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}
