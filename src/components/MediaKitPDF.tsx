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
  border: "rgba(240, 246, 252, 0.1)",
};

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    padding: 40,
    fontFamily: "Helvetica",
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: `1px solid ${colors.backgroundTertiary}`,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    border: `3px solid ${colors.primary}`,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 11,
    color: colors.foregroundMuted,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionTitleAccent: {
    color: colors.primary,
  },
  // Bio
  bio: {
    fontSize: 11,
    color: colors.foregroundSecondary,
    lineHeight: 1.6,
    marginBottom: 20,
  },
  // Metrics Grid
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    width: "31%",
    border: `1px solid ${colors.backgroundTertiary}`,
  },
  metricLabel: {
    fontSize: 9,
    color: colors.foregroundMuted,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 2,
  },
  metricTrend: {
    fontSize: 9,
    color: colors.success,
  },
  // Demographics
  demographicsGrid: {
    flexDirection: "row",
    gap: 20,
  },
  demographicsColumn: {
    flex: 1,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 3,
    marginTop: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  progressText: {
    fontSize: 9,
    color: colors.foregroundSecondary,
  },
  progressValue: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Gender boxes
  genderRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  genderBox: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  genderValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.foreground,
  },
  genderLabel: {
    fontSize: 8,
    color: colors.foregroundMuted,
    textTransform: "uppercase",
    marginTop: 2,
  },
  // Location tags
  locationTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  locationTag: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 9,
    color: colors.foregroundSecondary,
  },
  // Story
  storyBox: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    borderRadius: 12,
    borderLeft: `3px solid ${colors.accent}`,
  },
  storyText: {
    fontSize: 11,
    color: colors.foregroundSecondary,
    lineHeight: 1.7,
    fontStyle: "italic",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    borderTop: `1px solid ${colors.backgroundTertiary}`,
  },
  footerText: {
    fontSize: 8,
    color: colors.foregroundMuted,
  },
  footerBrand: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: "bold",
  },
  // Pricing
  pricingGrid: {
    flexDirection: "row",
    gap: 12,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    border: `1px solid ${colors.backgroundTertiary}`,
  },
  pricingCardPopular: {
    borderColor: colors.primary,
  },
  pricingName: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 4,
  },
  pricingPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  pricingFeature: {
    fontSize: 9,
    color: colors.foregroundMuted,
    marginBottom: 3,
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
const MediaKitDocument: React.FC<{ data: MediaKitData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {data.avatarUrl && (
          <Image src={data.avatarUrl} style={styles.avatar} />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.tagline}>
            📍 {data.location} • {data.niche}
          </Text>
          {data.socials?.map((social, i) => (
            <View key={i} style={styles.badge}>
              <Text style={styles.badgeText}>
                {social.platform}: {social.handle}
              </Text>
            </View>
          ))}
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

      {/* Demographics */}
      {data.demographics && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Demografia da <Text style={styles.sectionTitleAccent}>Audiência</Text>
          </Text>
          <View style={styles.demographicsGrid}>
            {/* Age */}
            <View style={styles.demographicsColumn}>
              <Text style={{ ...styles.metricLabel, marginBottom: 8 }}>
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
                        width: `${item.value}%`,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* Gender & Location */}
            <View style={styles.demographicsColumn}>
              <Text style={{ ...styles.metricLabel, marginBottom: 8 }}>
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

              <Text style={{ ...styles.metricLabel, marginBottom: 8 }}>
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
      )}

      {/* Story */}
      {data.story && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Minha <Text style={{ color: colors.accent }}>História</Text>
          </Text>
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>{data.story}</Text>
          </View>
        </View>
      )}

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
  </Document>
);

// Função para gerar e baixar o PDF
export async function downloadMediaKitPDF(data: MediaKitData, filename: string = "media-kit.pdf") {
  const blob = await pdf(<MediaKitDocument data={data} />).toBlob();
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

