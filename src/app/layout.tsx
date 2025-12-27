import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Provly | Prove seu valor",
  description: "Media kits profissionais que transformam métricas em parcerias.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
