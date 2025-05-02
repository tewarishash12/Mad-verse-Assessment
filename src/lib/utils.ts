// lib/utils.ts

// Capitalize the first letter of a string
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Deduplicate an array
export function unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

// Extract all unique types from a list of Pokémon
export function getAllTypes(pokemonList: { types: string[] }[]): string[] {
    const allTypes = pokemonList.flatMap(p => p.types);
    return unique(allTypes).sort();
}
