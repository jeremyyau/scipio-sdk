import { Scipio } from "scipio-sdk";

// 1. Initialize Dependency Injection with a secret key
// In production, this MUST come from process.env.SCIPIO_SECRET_KEY
const scipio = new Scipio({
  secretKey:
    process.env.SCIPIO_SECRET_KEY || "local-playground-secret-key-12345",
});

export default function Page() {
  const secretContent =
    "The rise of large language models (LLMs) and automated Web-scraping systems has threatened the web ecosystem, particularly content platforms where text intellectual properties are constantly harvested. 我愛香港，這是一段測試中文支援的防禦文本！";

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>🛡️ Project SCIPIO Playground</h1>
      <p>Demonstrating Zero-Hydration Client-Side Defense</p>

      <section
        style={{
          marginTop: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#666" }}>1. Unprotected Raw Text</h2>
        <p>{secretContent}</p>
      </section>

      <section
        style={{
          marginTop: "2rem",
          padding: "1rem",
          border: "2px dashed #e11d48",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#e11d48" }}>
          2. SCIPIO Protected Text (Inspect Element!)
        </h2>

        {/* 
          2. Use the bound Scipio.Text Server Component 
          We set locale="zh-HK" to support flawless CJK mixed tokenization,
          and a decoyDensity of 0.3 (30% honeypots).
        */}
        <div style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          <scipio.Text
            content={secretContent}
            mode="word"
            decoyDensity={0.3}
            locale="zh-HK"
          />
        </div>
      </section>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        <h3>💡 Commander's Checklist:</h3>
        <ul style={{ lineHeight: "1.5" }}>
          <li>
            Right-click the red box and select <b>Inspect</b>. You will see DOM
            elements completely out of order with <code>style="order: X"</code>!
          </li>
          <li>
            Look for invisible <code>opacity: 0</code> tags. Those are Marco
            Chain Decoys generated from the host text!
          </li>
          <li>
            Disable JavaScript in your browser completely, and refresh.{" "}
            <b>It still renders perfectly!</b> Scrapers can't bypass this.
          </li>
        </ul>
      </div>
    </main>
  );
}
