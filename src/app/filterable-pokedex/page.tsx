// app/filterable-pokedex/page.tsx
'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { FilterablePokedexTable } from '@/components/FilterablePokedexTable';

export default function FilterablePokedexPage() {
    const [selectedType, setSelectedType] = useState<string | undefined>();

    const { data: filteredPokemon } = trpc.pokemon.getByType.useQuery(selectedType);

    return (
        <FilterablePokedexTable
            pokemonList={filteredPokemon ?? []}
            selectedType={selectedType}
            selectType={setSelectedType}
        />
    );
}
