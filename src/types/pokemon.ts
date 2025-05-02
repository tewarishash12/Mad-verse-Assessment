export type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
};

export type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
};
