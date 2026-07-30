/**
 * Generates context-aware decoy text segments by sampling from the original content.
 * This ensures the frequency distribution of words/characters perfectly matches the host text,
 * defeating NLP-based frequency analysis scrapers without adding external dependencies.
 *
 * @param sourceNodes Array of string segments from the original text.
 * @param prng The deterministic PRNG function.
 * @param count The number of decoy sets to generate.
 * @returns An array of randomly assembled decoy strings.
 */
export function generateDecoys(
  sourceNodes: string[],
  prng: () => number,
  count: number,
): string[] {
  if (sourceNodes.length === 0 || count <= 0) return [];

  const decoys: string[] = [];
  for (let i = 0; i < count; i++) {
    // Randomly combine 1 to 3 segments to form a honeypot phrase
    const clusterSize = Math.floor(prng() * 3) + 1;
    let fakeText = "";

    for (let j = 0; j < clusterSize; j++) {
      const randomIndex = Math.floor(prng() * sourceNodes.length);
      // Trim empty spaces to keep it clean
      const segment = sourceNodes[randomIndex].trim();
      if (segment) {
        fakeText += segment + (j < clusterSize - 1 ? " " : "");
      }
    }

    if (fakeText) {
      decoys.push(fakeText);
    }
  }

  return decoys;
}
