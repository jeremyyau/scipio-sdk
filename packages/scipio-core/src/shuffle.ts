/**
 * Deterministic Fisher-Yates array shuffle.
 * @param array The input array.
 * @param prng Output of createPRNG() that yields [0, 1).
 * @returns A newly shuffled array without mutating the original.
 */
export function seededShuffle<T>(array: T[], prng: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
