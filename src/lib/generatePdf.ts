"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function generatePdf(elementId: string, filename: string = "media-kit.pdf") {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Elemento não encontrado:", elementId);
    return;
  }

  // Esconde elementos com classe no-print
  const noPrintElements = element.querySelectorAll(".no-print");
  noPrintElements.forEach((el) => {
    (el as HTMLElement).style.display = "none";
  });

  try {
    // Captura o elemento como canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Melhor qualidade
      useCORS: true, // Permite imagens de outros domínios
      allowTaint: true,
      backgroundColor: "#0D1117", // Fundo dark
      logging: false,
      windowWidth: 1200, // Largura fixa para consistência
    });

    // Dimensões do PDF (A4)
    const imgWidth = 210; // mm
    const pageHeight = 297; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Cria o PDF
    const pdf = new jsPDF({
      orientation: imgHeight > pageHeight ? "portrait" : "portrait",
      unit: "mm",
      format: "a4",
    });

    // Se a imagem for maior que uma página, divide em múltiplas páginas
    let heightLeft = imgHeight;
    let position = 0;
    const imgData = canvas.toDataURL("image/png");

    // Primeira página
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Páginas adicionais se necessário
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Salva o arquivo
    pdf.save(filename);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    alert("Erro ao gerar PDF. Tente novamente.");
  } finally {
    // Restaura elementos escondidos
    noPrintElements.forEach((el) => {
      (el as HTMLElement).style.display = "";
    });
  }
}

