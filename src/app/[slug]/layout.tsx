"use client";

import { PdfProvider } from "@/contexts/PdfContext";

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PdfProvider>{children}</PdfProvider>;
}





