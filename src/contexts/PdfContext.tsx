"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { downloadMediaKitPDF, MediaKitData } from "@/components/MediaKitPDF";

interface PdfContextType {
  setData: (data: MediaKitData) => void;
  downloadPdf: (filename?: string) => Promise<void>;
  isGenerating: boolean;
}

const PdfContext = createContext<PdfContextType | null>(null);

export function PdfProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MediaKitData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPdf = useCallback(async (filename?: string) => {
    if (!data) {
      console.error("PDF data not set");
      return;
    }
    setIsGenerating(true);
    try {
      await downloadMediaKitPDF(data, filename || "media-kit.pdf");
    } finally {
      setIsGenerating(false);
    }
  }, [data]);

  return (
    <PdfContext.Provider value={{ setData, downloadPdf, isGenerating }}>
      {children}
    </PdfContext.Provider>
  );
}

export function usePdf() {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error("usePdf must be used within a PdfProvider");
  }
  return context;
}




