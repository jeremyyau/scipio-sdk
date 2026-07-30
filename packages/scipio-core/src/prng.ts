/**
 * Generates a 32-bit integer seed from a string token.
 * This ensures our HMAC LyokoToken can be deterministically converted into a numeric seed.
 * @param str The string token (e.g., LyokoToken).
 * @returns A 32-bit unsigned integer.
 */
export function generateNumericSeed(str: string): number {
  let h = 0xdeadbeef;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  }
  return (h ^ (h >>> 16)) >>> 0;
}

/**
 * Mulberry32 Pseudo-Random Number Generator.
 * Extremely fast, stateful PRNG perfect for deterministic shuffle operations.
 * @param seed The initial 32-bit numeric seed.
 * @returns A function that generates a deterministic pseudo-random float between 0 (inclusive) and 1 (exclusive).
 */
export function createPRNG(seed: number): () => number {
  let a = seed;
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
