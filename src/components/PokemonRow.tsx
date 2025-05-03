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
                    transform: 'scale(1.03)', // Slight scale-up effect for a page-flipping feel
                    transition: 'transform 0.3s ease-in-out', // Smooth transition
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow to mimic depth
                    cursor: 'pointer',
                    backgroundColor: '#F9F9F9', // Light background color on hover, like flipping a page
                },
            }}
        >
            <TableCell
                sx={{
                    color: '#1A237E', // Dark blue for the text, reminiscent of book text
                    fontWeight: 'bold',
                    fontFamily: 'serif', // Serif font for a more book-like feel
                    padding: '10px 20px', // Padding for a cleaner look
                }}
            >
                {id}
            </TableCell>
            <TableCell
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1A237E', // Dark blue for the name, tying it to the book's theme
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    padding: '10px 20px',
                }}
            >
                <Avatar
                    alt={name}
                    src={sprite}
                    sx={{ width: 50, height: 50, mr: 2, border: '2px solid #E53935' }} // Slightly larger avatar with a border
                />
                {name}
            </TableCell>
            <TableCell
                sx={{
                    color: '#1A237E', // Dark blue for the types
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
