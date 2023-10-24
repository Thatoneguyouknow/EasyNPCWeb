export function findLargestNumber(search: number[]): number {
    return search.reduce((a, b) => Math.max(a, b));
}
