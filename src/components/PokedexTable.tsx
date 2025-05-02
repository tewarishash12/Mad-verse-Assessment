// components/PokedexTable.tsx
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material';
import { PokemonRow } from './PokemonRow';

type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
};

type PokedexTableProps = {
    pokemonList: Pokemon[];
};

export const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonList }) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Types</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemonList.map((pokemon) => (
                        <PokemonRow key={pokemon.id} pokemon={pokemon} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
