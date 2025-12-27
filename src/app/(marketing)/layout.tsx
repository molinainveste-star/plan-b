import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provly | Media Kits que fecham parcerias",
  description: "Transforme suas métricas em propostas profissionais. Mostre para marcas porque vale a pena trabalhar com você.",
  openGraph: {
    title: "Provly | Media Kits que fecham parcerias",
    description: "Transforme suas métricas em propostas profissionais.",
    type: "website",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

