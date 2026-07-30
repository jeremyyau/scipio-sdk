# SCIPIO SDK: Sovereign Zero-Hydration Client-Side Defense

**Time-Based Isomorphic DOM Obfuscation Protocol for React Server Components.**

![npm version](https://img.shields.io/npm/v/scipio-sdk?color=blue)
![license](https://img.shields.io/npm/l/scipio-sdk?cacheSeconds=0)

The **SCIPIO Protocol (Sovereignty Pre-emption & Isomorphic Obfuscation)** is a state-of-the-art web security mechanism engineered to protect text-based intellectual properties from automated scraping systems and LLM data harvesters.

Traditional web-scraping defenses (e.g., JavaScript obfuscation, dynamic web fonts) suffer from a fundamental architectural flaw: decryption logic and secret seeds must migrate to the client, leaving them vulnerable to reverse engineering. SCIPIO completely divorces the decryption engine from the client browser by utilizing native browser CSS layout engines (Flexbox/Grid) for visual re-ordering, making scraper Developer Experience (DX) and ROI collapse to near-zero.

---

## 🛡️ Core Features

- **Zero-Hydration Defense**: No JavaScript decryption logic or secret keys are ever shipped to the browser. Hydration overhead is strictly zero.
- **100% SEO Preserved**: Visual reordering is done purely via declarative CSS (`order` property), ensuring native web crawlers like Googlebot index your content perfectly.
- **Universal Multi-Language Support (CJK & Emojis)**: Powered by the native `Intl.Segmenter` API, text is accurately tokenized across all languages (including Chinese, Japanese, Korean) without breaking emojis or complex ligatures.
- **Context-Aware Honeypots**: Randomly generates CSS-hidden decoy nodes using frequency distributions matched from your host text, perfectly spoofing static NLP frequency-analysis parsers.
- **React Server Component Native**: Specifically built for modern Isomorphic rendering frameworks like Next.js App Router.

## 📦 Installation

```bash
npm install scipio-sdk
```

## 🚀 Quick Start (Next.js App Router)

SCIPIO enforces a strict boundary policy and will throw a fatal error if executed on the client-side. Initialize your instance via Dependency Injection in your Server Component environment.

```tsx
// app/page.tsx
import { Scipio } from "scipio-sdk";

// 1. Initialize with your secure environment variable
const scipio = new Scipio({
  secretKey: process.env.SCIPIO_SECRET_KEY || "your-fallback-secret",
});

export default function ProtectedArticle() {
  const content =
    "The rise of automated Web-scraping systems has threatened the web ecosystem. High-value data engines represent the core proprietary assets of digital corporations.";

  return (
    <article>
      <h1>Premium Secured Content</h1>

      {/* 2. Render secured text natively in your Server Component */}
      <scipio.Text
        content={content}
        mode="word" // Options: 'char' | 'word' | 'sentence'
        decoyDensity={0.3} // 30% honeypot decoy injection
        locale="zh-HK" // Optional: locale specification for Intl.Segmenter
      />
    </article>
  );
}
```

## ⚙️ Configuration Properties

The `<scipio.Text />` component accepts the following configurations:

| Prop           | Type                             | Default      | Description                                                                                                                |
| -------------- | -------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `content`      | `string`                         | **Required** | The raw premium text to be protected.                                                                                      |
| `mode`         | `'char' \| 'word' \| 'sentence'` | `'word'`     | The algorithmic granularity for the Fisher-Yates array permutation. `'word'` is highly recommended for balanced DOM sizes. |
| `decoyDensity` | `number`                         | `0.1`        | The percentage of Markov-chain invisible fake nodes to inject into the DOM. (e.g., `0.3` injects 30% additional nodes).    |
| `locale`       | `string`                         | `undefined`  | Required for strict CJK environments (e.g., `zh-HK` or `ja-JP`) to instruct `Intl.Segmenter`.                              |

## 📐 Architecture / How it Works

1. **Server-Side Rendering**: A deterministic Numeric Seed is generated using an HMAC-SHA256 hash (`LyokoToken`) computed against the server time (30s window) and your `secretKey`.
2. **Text Segmentation**: Content is segmented via `Intl.Segmenter`.
3. **Decoy Injection & Shuffling**: Contextual decoy segments are generated from the source code and concatenated. The combined array is randomized via a Mulberry32 PRNG and Fisher-Yates Shuffle.
4. **Declarative Output**: The server outputs `<span style="order: X">` for real text and invisible absolute bounds for decoys. Browsers visually restack them into legible sentences instantly, while raw HTML source dumps appear incomprehensible to crawlers.

## 📄 License & Intellectual Property

For cryptographic threat model proofs and theoretical implementation details, please refer to the project's Whitepaper declaration: **Project SCIPIO Protocol**.

Copyright © 2026 Jeremy Yau. All rights reserved.
