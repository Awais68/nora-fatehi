import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nora Fatehi | Actress & Model Portfolio",
  description: "Official portfolio showcasing the work of international actress, model, and performer Nora Fatehi",
  keywords: ["Nora Fatehi", "actress", "model", "portfolio", "fashion", "entertainment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
