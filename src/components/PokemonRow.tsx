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
        <TableRow
            sx={{
                '&:hover': {
                    transform: 'scale(1.03)', 
                    transition: 'transform 0.3s ease-in-out', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                    cursor: 'pointer',
                    backgroundColor: '#F9F9F9', 
                },
            }}
        >
            <TableCell
                sx={{
                    color: '#1A237E',
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    padding: '10px 20px',
                }}
            >
                {id}
            </TableCell>
            <TableCell
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1A237E', 
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    padding: '10px 20px',
                }}
            >
                <Avatar
                    alt={name}
                    src={sprite}
                    sx={{ width: 50, height: 50, mr: 2, border: '2px solid #E53935' }} 
                />
                {name}
            </TableCell>
            <TableCell
                sx={{
                    color: '#1A237E',
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    padding: '10px 20px',
                }}
            >
                {types.join(', ')}
            </TableCell>
        </TableRow>
    );
};
