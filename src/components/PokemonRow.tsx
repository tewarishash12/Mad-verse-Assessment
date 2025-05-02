// components/PokemonRow.tsx
import React from 'react';
import { TableRow, TableCell, Avatar } from '@mui/material';

export interface PokemonRowProps {
    pokemon: {
        id: number;
        name: string;
        types: string[];
        sprite: string;
    };
}
export const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
    const { id, name, types, sprite } = pokemon;
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>
                <Avatar alt={name} src={sprite} sx={{ width: 40, height: 40, mr: 1 }} />
                {name}
            </TableCell>
            <TableCell>{types.join(', ')}</TableCell>
        </TableRow>
    );
};
