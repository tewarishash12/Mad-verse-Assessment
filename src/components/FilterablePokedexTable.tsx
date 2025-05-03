import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
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

export const FilterablePokedexTable: React.FC<FilterablePokedexTableProps> = ({ pokemonList, selectedType, selectType }) => {

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        selectType(event.target.value);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', color: '#000', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {/* Filter Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel sx={{ color: '#1A237E' }}>Filter by Type</InputLabel>
                <Select
                    value={selectedType || ''}
                    onChange={handleTypeChange}
                    label="Filter by Type"
                    sx={{
                        backgroundColor: '#fff',
                        '& .MuiInputLabel-root': { color: '#1A237E' },
                        '& .MuiSelect-root': { color: '#000' },
                        '& .MuiOutlinedInput-root': { borderColor: '#1A237E' }
                    }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Fire">Fire</MenuItem>
                    <MenuItem value="Water">Water</MenuItem>
                    <MenuItem value="Grass">Grass</MenuItem>
                    {/* Add more types as needed */}
                </Select>
            </FormControl>

            {/* Pokémon Table */}
            <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
                <Table stickyHeader sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1A237E' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Types</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pokemonList.map((pokemon) => (
                            <TableRow
                                key={pokemon.id}
                                sx={{
                                    '&:hover': {
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                        cursor: 'pointer',
                                    },
                                    '& td': {
                                        borderBottom: '1px solid #ddd',
                                    },
                                }}
                            >
                                <TableCell sx={{ color: '#000' }}>{pokemon.id}</TableCell>
                                <TableCell sx={{ color: '#000' }}>{pokemon.name}</TableCell>
                                <TableCell sx={{ color: '#000' }}>{pokemon.types.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* View More Button */}
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#FFEB3B',
                    color: '#000',
                    fontWeight: 'bold',
                    marginTop: 2,
                    '&:hover': {
                        backgroundColor: '#FBC02D',
                    },
                }}
            >
                View More Pokémon
            </Button>
        </div>
    );
};
