import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fonte para títulos - Bold e Impactante (Provly Brand)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

// Fonte para corpo - Clean e Moderna
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Fonte para métricas/dados
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Provly | Prove seu valor",
  description: "Media kits profissionais que transformam métricas em parcerias. Prove seu valor para marcas.",
  keywords: ["media kit", "creators", "influenciadores", "métricas", "parcerias", "marcas"],
  authors: [{ name: "Provly" }],
  openGraph: {
    title: "Provly | Prove seu valor",
    description: "Media kits profissionais que transformam métricas em parcerias.",
    siteName: "Provly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Provly | Prove seu valor",
    description: "Media kits profissionais que transformam métricas em parcerias.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable}`} style={{
        fontFamily: "var(--font-body), system-ui, sans-serif",
      }}>
        {children}
      </body>
    </html>
  );
}
