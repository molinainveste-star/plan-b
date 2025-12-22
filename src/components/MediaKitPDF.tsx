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
  Font,
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
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontFamily: "Helvetica",
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundTertiary,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.foreground,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 10,
    color: colors.foregroundMuted,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionTitleAccent: {
    color: colors.primary,
  },
  // Bio
  bio: {
    fontSize: 10,
    color: colors.foregroundSecondary,
    lineHeight: 1.5,
    marginBottom: 16,
  },
  // Metrics Grid
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  metricCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 12,
    borderRadius: 6,
    width: "31%",
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    fontSize: 7,
    color: colors.foregroundMuted,
    marginBottom: 3,
    textTransform: "uppercase",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 2,
  },
  metricTrend: {
    fontSize: 7,
    color: colors.success,
  },
  // Demographics
  demographicsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  demographicsColumn: {
    flex: 1,
  },
  progressBar: {
    height: 5,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 3,
    marginTop: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: 5,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  progressText: {
    fontSize: 8,
    color: colors.foregroundSecondary,
  },
  progressValue: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Gender boxes
  genderRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  genderBox: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  genderValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.foreground,
  },
  genderLabel: {
    fontSize: 7,
    color: colors.foregroundMuted,
    textTransform: "uppercase",
    marginTop: 2,
  },
  // Location tags
  locationTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  locationTag: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 8,
    color: colors.foregroundSecondary,
  },
  // Story
  storyBox: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  storyText: {
    fontSize: 9,
    color: colors.foregroundSecondary,
    lineHeight: 1.6,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 25,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundTertiary,
  },
  footerText: {
    fontSize: 7,
    color: colors.foregroundMuted,
  },
  footerBrand: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Pricing
  pricingGrid: {
    flexDirection: "row",
    gap: 8,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pricingCardPopular: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  pricingName: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 3,
  },
  pricingPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 6,
  },
  pricingFeature: {
    fontSize: 7,
    color: colors.foregroundMuted,
    marginBottom: 2,
  },
  // Page number
  pageNumber: {
    position: "absolute",
    bottom: 25,
    right: 50,
    fontSize: 8,
    color: colors.foregroundMuted,
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.backgroundTertiary,
    marginVertical: 16,
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
}

// Componente do documento PDF
const MediaKitDocument: React.FC<{ data: MediaKitData; avatarBase64?: string }> = ({ data, avatarBase64 }) => (
  <Document>
    {/* Página 1 - Header, Métricas */}
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
          <Text style={styles.bio}>{data.bio}</Text>
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

      {/* Story */}
      {data.story && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Minha <Text style={{ color: colors.accent }}>História</Text>
          </Text>
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>
              {data.story.length > 800 ? data.story.slice(0, 800) + "..." : data.story}
            </Text>
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
    </Page>

    {/* Página 2 - Demographics */}
    {data.demographics && (
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Demografia da <Text style={styles.sectionTitleAccent}>Audiência</Text>
          </Text>
          <View style={styles.demographicsGrid}>
            {/* Age */}
            <View style={styles.demographicsColumn}>
              <Text style={{ ...styles.metricLabel, marginBottom: 8, fontSize: 9 }}>
                Faixa Etária
              </Text>
              {data.demographics.age.map((item, i) => (
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
              <Text style={{ ...styles.metricLabel, marginBottom: 8, fontSize: 9 }}>
                Gênero
              </Text>
              <View style={styles.genderRow}>
                <View style={styles.genderBox}>
                  <Text style={styles.genderValue}>
                    {data.demographics.gender.female}%
                  </Text>
                  <Text style={styles.genderLabel}>Feminino</Text>
                </View>
                <View style={styles.genderBox}>
                  <Text style={styles.genderValue}>
                    {data.demographics.gender.male}%
                  </Text>
                  <Text style={styles.genderLabel}>Masculino</Text>
                </View>
              </View>

              <Text style={{ ...styles.metricLabel, marginBottom: 8, marginTop: 8, fontSize: 9 }}>
                Localização
              </Text>
              <View style={styles.locationTags}>
                {data.demographics.countries.map((country, i) => (
                  <View key={i} style={styles.locationTag}>
                    <Text style={styles.locationText}>{country}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

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
                  {pkg.features.slice(0, 4).map((feature, j) => (
                    <Text key={j} style={styles.pricingFeature}>
                      ✓ {feature}
                    </Text>
                  ))}
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
      </Page>
    )}
  </Document>
);

// Função para converter URL de imagem em base64
async function imageUrlToBase64(url: string): Promise<string | null> {
  try {
    // Usa um proxy para evitar CORS ou tenta direto
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
  // Tenta converter avatar para base64
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
