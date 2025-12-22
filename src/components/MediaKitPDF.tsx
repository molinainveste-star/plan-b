"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";

// Cores do design system
const colors = {
  background: "#0D1117",
  backgroundSecondary: "#161B22",
  backgroundTertiary: "#21262D",
  foreground: "#F0F6FC",
  foregroundSecondary: "#C9D1D9",
  foregroundMuted: "#8B949E",
  primary: "#00D4FF",
  accent: "#7C3AED",
  success: "#10B981",
  border: "#30363D",
};

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundTertiary,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.foreground,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 3,
  },
  tagline: {
    fontSize: 9,
    color: colors.foregroundMuted,
    marginBottom: 5,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 5,
  },
  badge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 7,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Section
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionTitleAccent: {
    color: colors.primary,
  },
  // Bio
  bio: {
    fontSize: 9,
    color: colors.foregroundSecondary,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  // Metrics Grid
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 6,
  },
  metricCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 10,
    borderRadius: 5,
    width: "31%",
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    fontSize: 6,
    color: colors.foregroundMuted,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 1,
  },
  metricTrend: {
    fontSize: 6,
    color: colors.success,
  },
  // Demographics
  demographicsGrid: {
    flexDirection: "row",
    gap: 14,
  },
  demographicsColumn: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 2,
    marginTop: 2,
    marginBottom: 5,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  progressText: {
    fontSize: 7,
    color: colors.foregroundSecondary,
  },
  progressValue: {
    fontSize: 7,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Gender boxes
  genderRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  genderBox: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  genderValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.foreground,
  },
  genderLabel: {
    fontSize: 6,
    color: colors.foregroundMuted,
    textTransform: "uppercase",
    marginTop: 1,
  },
  // Location tags
  locationTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  locationTag: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 7,
    color: colors.foregroundSecondary,
  },
  // Story
  storyBox: {
    backgroundColor: colors.backgroundSecondary,
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  storyText: {
    fontSize: 8,
    color: colors.foregroundSecondary,
    lineHeight: 1.5,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundTertiary,
  },
  footerText: {
    fontSize: 6,
    color: colors.foregroundMuted,
  },
  footerBrand: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Pricing
  pricingGrid: {
    flexDirection: "row",
    gap: 6,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pricingCardPopular: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  pricingName: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 2,
  },
  pricingPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  pricingFeature: {
    fontSize: 6,
    color: colors.foregroundMuted,
    marginBottom: 2,
  },
  // Cases / Vitrine de Sucesso
  casesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  caseCard: {
    width: "48%",
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  caseImage: {
    width: "100%",
    height: 80,
    backgroundColor: colors.backgroundTertiary,
  },
  caseContent: {
    padding: 8,
  },
  caseBrand: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  caseTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 3,
  },
  caseDescription: {
    fontSize: 7,
    color: colors.foregroundMuted,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  caseMetrics: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
  },
  caseMetricBadge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  caseMetricText: {
    fontSize: 6,
    color: colors.success,
    fontWeight: "bold",
  },
  // Page number
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 7,
    color: colors.foregroundMuted,
  },
});

// Tipos
interface MediaKitData {
  name: string;
  bio: string;
  avatarUrl: string;
  location: string;
  niche: string;
  metrics: Array<{
    label: string;
    value: string;
    trend?: string;
  }>;
  demographics?: {
    age: Array<{ label: string; value: number }>;
    gender: { female: number; male: number };
    countries: string[];
  };
  story?: string;
  socials?: Array<{ platform: string; handle: string }>;
  pricing?: Array<{
    name: string;
    price: string;
    features: string[];
    popular?: boolean;
  }>;
  cases?: Array<{
    brand: string;
    title: string;
    description: string;
    metrics: string[];
  }>;
}

// Componente do documento PDF
const MediaKitDocument: React.FC<{ data: MediaKitData; avatarBase64?: string }> = ({ data, avatarBase64 }) => (
  <Document>
    {/* Página 1 - Header, Métricas, História */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {avatarBase64 ? (
            <Image src={avatarBase64} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{data.name.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.tagline}>
            📍 {data.location} • {data.niche}
          </Text>
          <View style={styles.badgeRow}>
            {data.socials?.slice(0, 3).map((social, i) => (
              <View key={i} style={styles.badge}>
                <Text style={styles.badgeText}>
                  {social.platform}: {social.handle}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bio */}
      {data.bio && (
        <View style={styles.section}>
          <Text style={styles.bio}>
            {data.bio.length > 300 ? data.bio.slice(0, 300) + "..." : data.bio}
          </Text>
        </View>
      )}

      {/* Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Estatísticas do <Text style={styles.sectionTitleAccent}>Canal</Text>
        </Text>
        <View style={styles.metricsGrid}>
          {data.metrics.slice(0, 6).map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              {metric.trend && (
                <Text style={styles.metricTrend}>{metric.trend}</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Story (resumida) */}
      {data.story && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Minha <Text style={{ color: colors.accent }}>História</Text>
          </Text>
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>
              {data.story.length > 500 ? data.story.slice(0, 500) + "..." : data.story}
            </Text>
          </View>
        </View>
      )}

      {/* Demographics na mesma página */}
      {data.demographics && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Demografia da <Text style={styles.sectionTitleAccent}>Audiência</Text>
          </Text>
          <View style={styles.demographicsGrid}>
            {/* Age */}
            <View style={styles.demographicsColumn}>
              <Text style={{ ...styles.metricLabel, marginBottom: 6, fontSize: 8 }}>
                Faixa Etária
              </Text>
              {data.demographics.age.slice(0, 4).map((item, i) => (
                <View key={i}>
                  <View style={styles.progressLabel}>
                    <Text style={styles.progressText}>{item.label}</Text>
                    <Text style={styles.progressValue}>{item.value}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        ...styles.progressFill,
                        width: `${Math.min(item.value, 100)}%`,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* Gender & Location */}
            <View style={styles.demographicsColumn}>
              <Text style={{ ...styles.metricLabel, marginBottom: 6, fontSize: 8 }}>
                Gênero
              </Text>
              <View style={styles.genderRow}>
                <View style={styles.genderBox}>
                  <Text style={styles.genderValue}>
                    {data.demographics.gender.female}%
                  </Text>
                  <Text style={styles.genderLabel}>Fem</Text>
                </View>
                <View style={styles.genderBox}>
                  <Text style={styles.genderValue}>
                    {data.demographics.gender.male}%
                  </Text>
                  <Text style={styles.genderLabel}>Masc</Text>
                </View>
              </View>

              <Text style={{ ...styles.metricLabel, marginBottom: 4, fontSize: 8 }}>
                Localização
              </Text>
              <View style={styles.locationTags}>
                {data.demographics.countries.slice(0, 4).map((country, i) => (
                  <View key={i} style={styles.locationTag}>
                    <Text style={styles.locationText}>{country}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Gerado em {new Date().toLocaleDateString("pt-BR")}
        </Text>
        <Text style={styles.footerBrand}>PubliScore</Text>
      </View>
      <Text style={styles.pageNumber}>1</Text>
    </Page>

    {/* Página 2 - Pacotes + Vitrine de Sucesso */}
    {(data.pricing && data.pricing.length > 0) || (data.cases && data.cases.length > 0) ? (
      <Page size="A4" style={styles.page}>
        {/* Pricing */}
        {data.pricing && data.pricing.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pacotes de <Text style={styles.sectionTitleAccent}>Parceria</Text>
            </Text>
            <View style={styles.pricingGrid}>
              {data.pricing.slice(0, 3).map((pkg, i) => (
                <View
                  key={i}
                  style={pkg.popular ? [styles.pricingCard, styles.pricingCardPopular] : styles.pricingCard}
                >
                  <Text style={styles.pricingName}>{pkg.name}</Text>
                  <Text style={styles.pricingPrice}>{pkg.price}</Text>
                  {pkg.features.slice(0, 5).map((feature, j) => (
                    <Text key={j} style={styles.pricingFeature}>
                      ✓ {feature}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Vitrine de Sucesso */}
        {data.cases && data.cases.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Vitrine de <Text style={styles.sectionTitleAccent}>Sucesso</Text>
            </Text>
            <View style={styles.casesGrid}>
              {data.cases.slice(0, 4).map((caseItem, i) => (
                <View key={i} style={styles.caseCard}>
                  <View style={styles.caseContent}>
                    <Text style={styles.caseBrand}>{caseItem.brand}</Text>
                    <Text style={styles.caseTitle}>{caseItem.title}</Text>
                    <Text style={styles.caseDescription}>
                      {caseItem.description.length > 100 
                        ? caseItem.description.slice(0, 100) + "..." 
                        : caseItem.description}
                    </Text>
                    {caseItem.metrics && caseItem.metrics.length > 0 && (
                      <View style={styles.caseMetrics}>
                        {caseItem.metrics.slice(0, 2).map((metric, j) => (
                          <View key={j} style={styles.caseMetricBadge}>
                            <Text style={styles.caseMetricText}>{metric}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Gerado em {new Date().toLocaleDateString("pt-BR")}
          </Text>
          <Text style={styles.footerBrand}>PubliScore</Text>
        </View>
        <Text style={styles.pageNumber}>2</Text>
      </Page>
    ) : null}
  </Document>
);

// Função para converter URL de imagem em base64
async function imageUrlToBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'omit',
    });
    
    if (!response.ok) {
      console.warn("Falha ao carregar imagem:", url);
      return null;
    }
    
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn("Erro ao converter imagem:", error);
    return null;
  }
}

// Função para gerar e baixar o PDF
export async function downloadMediaKitPDF(data: MediaKitData, filename: string = "media-kit.pdf") {
  let avatarBase64: string | null = null;
  if (data.avatarUrl) {
    avatarBase64 = await imageUrlToBase64(data.avatarUrl);
  }

  const blob = await pdf(<MediaKitDocument data={data} avatarBase64={avatarBase64 || undefined} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export { MediaKitDocument };
export type { MediaKitData };
