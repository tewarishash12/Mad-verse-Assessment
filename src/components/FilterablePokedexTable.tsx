import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Select, MenuItem, FormControl, InputLabel, Skeleton } from '@mui/material';
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
    isLoading: boolean;
};

const pokemonTypes = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting',
    'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost',
    'Dark', 'Dragon', 'Steel', 'Fairy'
];

export const FilterablePokedexTable: React.FC<FilterablePokedexTableProps> = ({ pokemonList, selectedType, selectType, isLoading }) => {

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        selectType(event.target.value);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', color: '#000', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
                    {pokemonTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width={50} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={120} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={180} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            pokemonList.map((pokemon) => (
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
