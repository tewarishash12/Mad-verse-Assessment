// components/PokemonTypeSelection.tsx
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
            <InputLabel>Type</InputLabel>
            <Select value={selectedType ?? 'all'} onChange={handleChange} label="Type">
                <MenuItem value="all">All</MenuItem>
                {availableTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
