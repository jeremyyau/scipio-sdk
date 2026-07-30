import React from "react";
import { generateLyokoToken } from "./crypto";
import { generateNumericSeed, createPRNG } from "./prng";
import { seededShuffle } from "./shuffle";
import { generateDecoys } from "./decoy";

export interface ScipioTextProps {
  secretKey: string;
  content: string;
  mode?: "char" | "word" | "sentence";
  decoyDensity?: number;
  locale?: string | string[]; // Support multi-language CJK segmentation
}

export function ScipioText({
  secretKey,
  content,
  mode = "word",
  decoyDensity = 0.1,
  locale,
}: ScipioTextProps) {
  // 1. Generate Temporal LyokoToken
  const token = generateLyokoToken(secretKey);

  // 2. Tokenize content using native Intl.Segmenter for universal i18n & CJK support
  const granularity =
    mode === "char" ? "grapheme" : mode === "sentence" ? "sentence" : "word";
  const segmenter = new Intl.Segmenter(locale || undefined, { granularity });

  // Intl.Segmenter perfectly splits spaces, punctuation, and CJK characters without breaking them
  const textNodes = Array.from(segmenter.segment(content)).map(
    (s) => s.segment,
  );

  // Set up the original index tracking so CSS 'order' can put them back visually
  const nodes = textNodes.map((text, index) => ({
    text,
    originalIndex: index,
    isDecoy: false,
  }));

  // 3. Initialize PRNG and prepare decoys
  const seed = generateNumericSeed(token);
  const prng = createPRNG(seed);

  // Inject Decoys (B strategy: Context-Aware Extraction)
  const decoyCount = Math.ceil(textNodes.length * decoyDensity);
  const decoyStrings = generateDecoys(textNodes, prng, decoyCount);

  const decoyNodes = decoyStrings.map((text, ind) => ({
    text,
    isDecoy: true,
    originalIndex: textNodes.length + ind, // Doesn't matter visually, CSS handles hiding it
  }));

  // Combine real and fake nodes, then shuffle
  const combinedNodes = [
    ...nodes,
    ...decoyNodes.map((d) => ({
      text: d.text,
      originalIndex: d.originalIndex,
      isDecoy: d.isDecoy,
    })),
  ];
  const shuffledNodes = seededShuffle(combinedNodes, prng);

  // 4. Render declarative CSS payload
  return (
    <span
      className="scipio-stage"
      style={{ display: "inline-flex", flexWrap: "wrap" }}
    >
      {shuffledNodes.map((node, i) =>
        node.isDecoy ? (
          <span
            key={`decoy-${i}`}
            aria-hidden="true"
            tabIndex={-1}
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {node.text}
          </span>
        ) : (
          <span
            key={`node-${i}`}
            style={{ order: node.originalIndex, whiteSpace: "pre-wrap" }}
          >
            {node.text}
          </span>
        ),
      )}
    </span>
  );
}
