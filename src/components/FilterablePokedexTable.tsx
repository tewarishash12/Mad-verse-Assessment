// components/FilterablePokedexTable.tsx
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
};

type FilterablePokedexTableProps = {
    pokemonList: Pokemon[];
    selectedType: string | undefined;
    selectType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const FilterablePokedexTable: React.FC<FilterablePokedexTableProps> = ({pokemonList,selectedType,selectType}) => {
    
    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        selectType(event.target.value);
    };

    return (
        <div>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Filter by Type</InputLabel>
                <Select
                    value={selectedType || ''}
                    onChange={handleTypeChange}
                    label="Filter by Type"
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Fire">Fire</MenuItem>
                    <MenuItem value="Water">Water</MenuItem>
                    <MenuItem value="Grass">Grass</MenuItem>
                    {/* Add more types as needed */}
                </Select>
            </FormControl>

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
                            <TableRow key={pokemon.id}>
                                <TableCell>{pokemon.id}</TableCell>
                                <TableCell>{pokemon.name}</TableCell>
                                <TableCell>{pokemon.types.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
