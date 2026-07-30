export const metadata = {
  title: "SCIPIO Engine Playground",
  description: "Zero-Hydration Obfuscation Testing Environment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
