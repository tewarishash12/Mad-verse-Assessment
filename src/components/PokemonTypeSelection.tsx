import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
    availableTypes: string[];
};

export const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
    selectedType,
    selectType,
    availableTypes,
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        selectType(value === 'all' ? undefined : value);
    };

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#1A237E', fontFamily: 'serif' }}>Type</InputLabel> 
            <Select
                value={selectedType ?? 'all'}
                onChange={handleChange}
                label="Type"
                sx={{
                    backgroundColor: '#F9F9F9', 
                    borderRadius: '8px',
                    '& .MuiInputLabel-root': { color: '#1A237E', fontFamily: 'serif' },
                    '& .MuiSelect-root': { color: '#1A237E', fontFamily: 'serif' }, 
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: '#FFEB3B',
                            color: '#000',
                        },
                    },
                }}
            >
                <MenuItem value="all" sx={{ fontWeight: 'bold', color: '#1A237E' }}> 
                    All
                </MenuItem>
                {availableTypes.map((type) => (
                    <MenuItem key={type} value={type} sx={{ fontWeight: 'bold', color: '#1A237E' }}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
