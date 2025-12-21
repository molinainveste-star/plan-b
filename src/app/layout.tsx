import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Fonte para títulos - Bold e Impactante
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Fonte para corpo - Clean e Moderna
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PubliScore | Media Kits Profissionais",
  description: "Gere Media Kits automatizados com métricas do YouTube e narrativas por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jakarta.variable}`} style={{
        fontFamily: "var(--font-body), system-ui, sans-serif",
      }}>
        {children}
      </body>
    </html>
  );
}
