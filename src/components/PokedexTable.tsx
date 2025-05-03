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
        <TableContainer
            component={Paper}
            sx={{
                maxHeight: 500,
                borderRadius: '10px',
                backgroundColor: '#f9f9f9', // Lighter background to resemble a book page
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                color: '#000', // Black text for better readability
                padding: 2,
                marginTop: 4,
                marginBottom: 4,
                overflowY: 'auto',
            }}
        >
            <Table stickyHeader sx={{ borderCollapse: 'collapse' }}>
                <TableHead sx={{ backgroundColor: '#1A237E' }}> {/* Deep blue to mimic book theme */}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'gray', fontFamily: 'serif' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'gray', fontFamily: 'serif' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'gray', fontFamily: 'serif' }}>Types</TableCell>
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
