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
    fontSize: 11,
    color: colors.foregroundSecondary,
    lineHeight: 1.6,
    marginBottom: 14,
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
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  storyText: {
    fontSize: 10,
    color: colors.foregroundSecondary,
    lineHeight: 1.6,
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
  // Pricing - Layout igual ao site
  pricingGrid: {
    flexDirection: "row",
    gap: 10,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pricingCardPopular: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  pricingPopularBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 8,
  },
  pricingPopularBadgeText: {
    fontSize: 6,
    fontWeight: "bold",
    color: colors.background,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pricingName: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 6,
  },
  pricingPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 12,
  },
  pricingPriceUnit: {
    fontSize: 9,
    fontWeight: "normal",
    color: colors.foregroundMuted,
  },
  pricingFeatureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    gap: 6,
  },
  pricingFeatureCheck: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10B98130",
    justifyContent: "center",
    alignItems: "center",
  },
  pricingFeatureCheckText: {
    fontSize: 8,
    color: colors.success,
    fontWeight: "bold",
  },
  pricingFeatureText: {
    fontSize: 9,
    color: colors.foregroundSecondary,
    flex: 1,
    lineHeight: 1.4,
  },
  pricingButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.backgroundTertiary,
    alignItems: "center",
  },
  pricingButtonPopular: {
    backgroundColor: colors.primary,
  },
  pricingButtonText: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.foreground,
  },
  pricingButtonTextPopular: {
    color: colors.background,
  },
  // Cases / Vitrine de Sucesso
  casesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  caseCard: {
    width: "48%",
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    minHeight: 110,
  },
  caseImage: {
    width: "100%",
    height: 80,
    backgroundColor: colors.backgroundTertiary,
  },
  caseContent: {
    padding: 12,
  },
  caseBrand: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  caseTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 6,
  },
  caseDescription: {
    fontSize: 8,
    color: colors.foregroundSecondary,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  caseMetrics: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  caseMetricBadge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.success,
  },
  caseMetricText: {
    fontSize: 8,
    color: colors.success,
    fontWeight: "bold",
  },
  // Featured Videos
  videosSection: {
    marginBottom: 16,
  },
  videosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  videosSubtitle: {
    fontSize: 7,
    color: colors.foregroundMuted,
  },
  videosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  videoCard: {
    width: "31%",
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  videoThumbnail: {
    width: "100%",
    height: 50,
    backgroundColor: colors.backgroundTertiary,
  },
  videoContent: {
    padding: 6,
  },
  videoTitle: {
    fontSize: 7,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 4,
    lineHeight: 1.3,
  },
  videoStats: {
    flexDirection: "row",
    gap: 8,
  },
  videoStat: {
    fontSize: 6,
    color: colors.foregroundMuted,
  },
  videoTopBadge: {
    position: "absolute",
    top: 3,
    left: 3,
    backgroundColor: colors.accent,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoTopBadgeText: {
    fontSize: 5,
    fontWeight: "bold",
    color: colors.foreground,
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
  featuredVideos?: Array<{
    title: string;
    views: string;
    likes: string;
    videoId: string;
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
            {data.location} • {data.niche}
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
            {data.bio}
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

      {/* Featured Videos - Destaques Recentes */}
      {data.featuredVideos && data.featuredVideos.length > 0 && (
        <View style={styles.videosSection}>
          <View style={styles.videosHeader}>
            <Text style={styles.sectionTitle}>
              Destaques <Text style={styles.sectionTitleAccent}>Recentes</Text>
            </Text>
            <Text style={styles.videosSubtitle}>Ordenado por engajamento</Text>
          </View>
          <View style={styles.videosGrid}>
            {data.featuredVideos.slice(0, 6).map((video, index) => (
              <View key={index} style={styles.videoCard}>
                {video.videoId && (
                  <Image
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                    style={styles.videoThumbnail}
                  />
                )}
                {index === 0 && (
                  <View style={styles.videoTopBadge}>
                    <Text style={styles.videoTopBadgeText}>TOP</Text>
                  </View>
                )}
                <View style={styles.videoContent}>
                  <Text style={styles.videoTitle}>
                    {video.title.length > 40 ? video.title.slice(0, 40) + "..." : video.title}
                  </Text>
                  <View style={styles.videoStats}>
                    <Text style={styles.videoStat}>{video.views} views</Text>
                    <Text style={styles.videoStat}>{video.likes} likes</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Story (completa - quebra automática pelo estilo) */}
      {data.story && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Minha <Text style={{ color: colors.accent }}>História</Text>
          </Text>
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>
              {data.story}
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
        <Text style={styles.footerBrand}>Provly</Text>
      </View>
      <Text style={styles.pageNumber}>1</Text>
    </Page>

    {/* Página 2 - Pacotes + Vitrine de Sucesso */}
    {(data.pricing && data.pricing.length > 0) || (data.cases && data.cases.length > 0) ? (
      <Page size="A4" style={styles.page}>
        {/* Pricing - Layout igual ao site */}
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
                  {pkg.popular && (
                    <View style={styles.pricingPopularBadge}>
                      <Text style={styles.pricingPopularBadgeText}>Mais Escolhido</Text>
                    </View>
                  )}
                  <Text style={styles.pricingName}>{pkg.name}</Text>
                  <Text style={styles.pricingPrice}>
                    {pkg.price}
                    <Text style={styles.pricingPriceUnit}>/un</Text>
                  </Text>
                  {pkg.features.slice(0, 5).map((feature, j) => (
                    <View key={j} style={styles.pricingFeatureRow}>
                      <View style={styles.pricingFeatureCheck}>
                        <Text style={styles.pricingFeatureCheckText}>✓</Text>
                      </View>
                      <Text style={styles.pricingFeatureText}>{feature}</Text>
                    </View>
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
                    {caseItem.metrics && Array.isArray(caseItem.metrics) && caseItem.metrics.length > 0 && (
                      <View style={styles.caseMetrics}>
                        {caseItem.metrics.slice(0, 2).map((metric, j) => (
                          <View key={j} style={styles.caseMetricBadge}>
                            <Text style={styles.caseMetricText}>{String(metric)}</Text>
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
          <Text style={styles.footerBrand}>Provly</Text>
        </View>
        <Text style={styles.pageNumber}>2</Text>
      </Page>
    ) : null}
  </Document>
);

// Função para converter URL de imagem em base64 (com fallback para proxy CORS)
async function imageUrlToBase64(url: string): Promise<string | null> {
  try {
    // Lista de proxies CORS para tentar
    const proxyUrls = [
      url, // Tenta direto primeiro
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    ];

    let blob: Blob | null = null;

    for (const proxyUrl of proxyUrls) {
      try {
        const response = await fetch(proxyUrl, {
          mode: 'cors',
          credentials: 'omit',
        });
        
        if (response.ok) {
          blob = await response.blob();
          if (blob.size > 0) break;
        }
      } catch {
        continue;
      }
    }

    if (!blob || blob.size === 0) {
      console.warn("Falha ao carregar imagem após todas tentativas:", url);
      return null;
    }
    
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
