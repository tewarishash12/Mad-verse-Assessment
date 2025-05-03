'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { FilterablePokedexTable } from '@/components/FilterablePokedexTable';

export default function FilterablePokedexPage() {
    const [selectedType, setSelectedType] = useState<string | undefined>();

    const { data: filteredPokemon } = trpc.pokemon.getByType.useQuery(selectedType);

    return (
        <div
            style={{
                padding: '40px',
                backgroundColor: '#f8f5f0', // Neutral parchment-like background
                minHeight: '100vh',
                fontFamily: 'serif', // Book-like font
                color: '#1A237E', // Deep blue text
            }}
        >
            {/* Title/Header */}
            <h1
                style={{
                    textAlign: 'center',
                    color: '#B71C1C', // Deep red for heading
                    fontSize: '3rem',
                    marginBottom: '40px',
                    fontWeight: 700,
                    textShadow: '1px 1px #f0e4d7',
                }}
            >
                Pokédex: Type Explorer
            </h1>

            {/* Book-like Page Wrapper */}
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
                <FilterablePokedexTable
                    pokemonList={filteredPokemon ?? []}
                    selectedType={selectedType}
                    selectType={setSelectedType}
                />
            </div>
        </div>
    );
}
