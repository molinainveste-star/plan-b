"use client";

import { useEffect } from "react";
import { usePdf } from "@/contexts/PdfContext";
import { MediaKitData } from "@/components/MediaKitPDF";

interface PdfDataSetterProps {
  data: MediaKitData;
}

export function PdfDataSetter({ data }: PdfDataSetterProps) {
  const { setData } = usePdf();

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  return null;
}

