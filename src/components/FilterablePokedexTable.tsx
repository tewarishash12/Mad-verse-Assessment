// components/FilterablePokedexTable.tsx
import React, { useState } from 'react';
import { PokemonTypeSelection } from './PokemonTypeSelection';
import { PokedexTable } from "./PokedexTable"

type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
};

type FilterablePokedexTableProps = {
    allPokemon: Pokemon[];
    availableTypes: string[];
};

export const FilterablePokedexTable: React.FC<FilterablePokedexTableProps> = ({
    allPokemon,
    availableTypes,
}) => {
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

    const filteredPokemon = selectedType
        ? allPokemon.filter((p) => p.types.includes(selectedType))
        : allPokemon;

    return (
        <div>
            <PokemonTypeSelection
                selectedType={selectedType}
                selectType={setSelectedType}
                availableTypes={availableTypes}
            />
            <PokedexTable pokemonList={filteredPokemon} />
        </div>
    );
};
