export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

export function getAllTypes(pokemonList: { types: string[] }[]): string[] {
    const allTypes = pokemonList.flatMap(p => p.types);
    return unique(allTypes).sort();
}
