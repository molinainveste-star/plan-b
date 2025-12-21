import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/ProfileHeader";
import { MetricCard } from "@/components/MetricCard";
import { VideoChart } from "@/components/VideoChart";
import { EditableStory } from "@/components/EditableStory";
import { PricingTable } from "@/components/PricingTable";
import { CaseStudies } from "@/components/CaseStudies";
import { CallToAction } from "@/components/CallToAction";
import { ConnectYouTube } from "@/components/ConnectYouTube";
import { getProfileBySlug } from "@/lib/data";
import { getMediaKit } from "@/lib/mockData";
import { generateAIStory } from "@/lib/ai";
import { BadgeCheck } from "lucide-react";

export default async function MediaKitPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log(`🔍 Accessing profile page for slug: '${slug}'`);

    let profile = await getProfileBySlug(slug);
    // Force rebuild timestamp: 2025-12-21 12:45
    console.log(`👤 Profile result for '${slug}':`, profile ? "Found" : "Not Found");

    if (!profile) {
        console.warn(`⚠️ Profile not found in DB for slug: '${slug}'. Using Mock Data fallbacks.`);
        // Fallback to Mock Data (Sofia Davis) for development/demo purposes
        // This allows us to work on UI/PDF layout without needing a seeded DB
        const mockKit = getMediaKit(slug);

        // Map mockKit to the expected 'profile' shape
        // We create a synthetic profile object that matches the DB schema enough for the UI to render
        const mockProfile = {
            username: slug,
            full_name: mockKit.name,
            bio: mockKit.bio,
            niche: mockKit.niche,
            avatar_url: mockKit.avatarUrl,
            location: mockKit.location,
            metrics: mockKit.metrics.map(m => ({
                label: m.label,
                value: m.value,
                trend: m.trend,
                trend_direction: m.trendDirection,
                icon: m.icon
            })),
            social_accounts: mockKit.socials,
            video_performance: [], // Mock doesn't have video performance yet, empty array is safe
            custom_story: null,
            custom_pitch: null,
            brand_cases: [],
            is_verified: false,
            demographics: null,
            pricing_packages: []
        };

        // Proceed using the mockProfile instead of 404ing
        profile = mockProfile;
    }

    // Debug logging
    if (profile) {
        console.log(`🔍 Profile Data for '${slug}':`, JSON.stringify({
            username: profile.username,
            metrics_count: profile.metrics?.length,
            has_story: !!profile.custom_story,
            metrics_raw: profile.metrics
        }, null, 2));
    }

    // Map metrics from database with safety check
    const metrics = profile.metrics
        ?.filter((m: any) => m && m.label && m.value) // Filter out incomplete metrics
        .map((m: any) => ({
            label: m.label,
            value: m.value,
            trend: m.trend,
            trendDirection: m.trend_direction as "up" | "down" | "neutral",
            icon: m.icon,
        })) || [];

    // Map social accounts
    const socialLinks = profile.social_accounts?.map((s: any) => ({
        platform: s.platform as "Instagram" | "TikTok" | "YouTube" | "Twitter",
        handle: s.handle,
        url: s.url,
    })) || [];

    // Sort video performance by date
    const videoData = profile.video_performance?.sort((a: any, b: any) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    ) || [];

    // Generate AI Story (Default)
    const { story: defaultStory, pitch: defaultPitch } = generateAIStory(profile, metrics);

    // Use custom story/pitch if available
    const finalStory = profile.custom_story || defaultStory;
    const finalPitch = profile.custom_pitch || defaultPitch;

    // --- Demographics Data Preparation ---
    let ageData = [
        { label: "18-24", value: 35 },
        { label: "25-34", value: 45 },
        { label: "35-44", value: 15 },
        { label: "45+", value: 5 },
    ];
    let genderData = { female: 72, male: 28 };
    let countryData = ["Brasil 65%", "Portugal 15%", "EUA 10%", "Outros 10%"];

    // Use Verified Data if available
    if (profile.demographics && profile.is_verified) {
        const d = profile.demographics;

        // Age mapping
        if (d.age && d.age.length > 0) {
            ageData = d.age.map((item: any) => ({
                label: item.label.replace("age", ""),
                value: parseFloat(item.value).toFixed(1)
            })).sort((a: any, b: any) => b.value - a.value);
        }

        // Gender mapping
        if (d.gender) {
            const male = d.gender.find((g: any) => g.label.toLowerCase().includes("male"))?.value || 0;
            const female = d.gender.find((g: any) => g.label.toLowerCase().includes("female"))?.value || 0;
            // Normalize to 100% just in case
            const total = male + female;
            if (total > 0) {
                genderData = {
                    male: Math.round((male / total) * 100),
                    female: Math.round((female / total) * 100)
                };
            }
        }

        // Geography mapping
        if (d.country && d.country.length > 0) {
            countryData = d.country.map((c: any) => `${c.label} ${parseFloat(c.value).toFixed(0)}%`);
        }
    }


    return (
        <main style={{ minHeight: "100vh", padding: "4rem 1rem", background: "var(--background)", paddingBottom: "8rem" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <ProfileHeader
                    slug={profile.username}
                    name={profile.full_name}
                    bio={profile.bio}
                    location={profile.location || "Brasil"}
                    niche={profile.niche || "Geral"}
                    avatarUrl={profile.avatar_url}
                    socials={socialLinks}
                />

                {/* Verified Badge Header - REMOVED BUTTON FROM HERE */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "3rem", marginBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--foreground)" }}>
                        Estatísticas do Canal
                    </h3>
                    {profile.is_verified && (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            background: "rgba(34, 197, 94, 0.1)",
                            color: "#16a34a",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "1rem",
                            fontSize: "0.75rem",
                            fontWeight: 600
                        }}>
                            <BadgeCheck size={14} />
                            Verificado
                        </div>
                    )}
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {metrics.length > 0 ? (
                        metrics.map((metric: any, index: number) => (
                            <MetricCard key={index} {...metric} />
                        ))
                    ) : (
                        // Fallback to mock metrics if none in DB
                        <>
                            <MetricCard
                                label="Total de Seguidores"
                                value="22.1K"
                                trend="+12% este mês"
                                trendDirection="up"
                                icon="users"
                            />
                            <MetricCard
                                label="Engajamento Médio"
                                value="4.8%"
                                trend="Média do setor: 2.1%"
                                trendDirection="neutral"
                                icon="activity"
                            />
                            <MetricCard
                                label="Alcance Mensal"
                                value="145K"
                                trend="+5% este mês"
                                trendDirection="up"
                                icon="eye"
                            />
                        </>
                    )}
                </div>

                {/* Video Performance Chart */}
                {videoData.length > 0 && (
                    <div style={{ marginTop: "3rem" }}>
                        <VideoChart data={videoData} />
                    </div>
                )}

                {/* Recent Video Thumbnails - Visible on Screen & Print */}
                <div className="print-thumbnails" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem", color: "var(--primary)" }}>
                        Destaques Recentes
                    </h4>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "1.5rem"
                    }}>
                        {videoData.slice(0, 9).map((video: any) => (
                            <div key={video.video_id} style={{ breakInside: "avoid" }}>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.video_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: "block", textDecoration: "none" }}
                                >
                                    <div style={{
                                        width: "100%",
                                        aspectRatio: "16/9",
                                        borderRadius: "0.5rem",
                                        overflow: "hidden",
                                        marginBottom: "0.5rem",
                                        border: "1px solid rgba(0,0,0,0.05)",
                                        background: "#f0f0f0",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                        transition: "transform 0.2s"
                                    }}
                                        className="hover:scale-105"
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`}
                                            alt={video.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                    <p style={{
                                        fontSize: "0.80rem",
                                        fontWeight: "600",
                                        lineHeight: "1.3",
                                        color: "var(--foreground)",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden"
                                    }}>
                                        {video.title}
                                    </p>
                                </a>
                                <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
                                    {new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(video.view_count)} views
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Story Section */}
                <div
                    className="glass-panel"
                    style={{
                        marginTop: "4rem",
                        padding: "4rem",
                        borderRadius: "2.5rem",
                        position: "relative",
                        overflow: "hidden",
                        background: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 40px 100px -20px rgba(0,0,0,0.2)",
                    }}
                >
                    <div style={{ position: "absolute", top: "2rem", right: "3rem" }}>
                        <span className="ia-insight-badge" style={{
                            padding: "0.5rem 1.25rem",
                            background: "var(--primary-gradient)",
                            borderRadius: "2rem",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "white",
                            boxShadow: "0 10px 20px -5px var(--primary)"
                        }}>
                            IA Insight
                        </span>
                    </div>

                    <h3 style={{
                        marginBottom: "2.5rem",
                        fontSize: "2.25rem",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        background: "linear-gradient(135deg, var(--foreground) 0%, var(--muted-foreground) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Minha História
                    </h3>

                    <EditableStory
                        slug={profile.username}
                        initialStory={finalStory}
                        initialPitch={finalPitch}
                        isPlaceholder={!profile.custom_story}
                        context={{
                            name: profile.full_name,
                            bio: profile.bio,
                            niche: profile.niche,
                            metrics: metrics,
                            videos: videoData
                        }}
                    />
                </div>

                {/* Demographics Section */}
                <div
                    className="glass-panel"
                    style={{
                        marginTop: "3rem",
                        padding: "3rem",
                        borderRadius: "2rem",
                        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.03)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--foreground)", marginBottom: 0 }}>
                            Demografia da Audiência
                        </h3>
                        {profile.is_verified ? (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                background: "rgba(34, 197, 94, 0.1)",
                                color: "#16a34a",
                                padding: "0.4rem 1rem",
                                borderRadius: "2rem",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                border: "1px solid rgba(34, 197, 94, 0.2)"
                            }}>
                                <BadgeCheck size={16} />
                                Dados verificados via YouTube API
                            </div>
                        ) : (
                            <ConnectYouTube slug={profile.username} />
                        )}
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "4rem",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    color: "var(--muted-foreground)",
                                    fontSize: "0.875rem",
                                    marginBottom: "1.5rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Faixa Etária
                            </p>
                            {ageData.map((item: any) => (
                                <div key={item.label} style={{ marginBottom: "1.25rem" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontSize: "0.875rem",
                                            marginBottom: "0.5rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        <span>{item.label}</span>
                                        <span style={{ color: "var(--primary)" }}>{item.value}%</span>
                                    </div>
                                    <div
                                        style={{
                                            height: "8px",
                                            background: "var(--background)",
                                            borderRadius: "4px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${item.value}%`,
                                                height: "100%",
                                                background: "var(--primary-gradient)",
                                                borderRadius: "4px",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p
                                style={{
                                    color: "var(--muted-foreground)",
                                    fontSize: "0.875rem",
                                    marginBottom: "1.5rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Gênero
                            </p>
                            <div style={{ display: "flex", gap: "1.5rem" }}>
                                <div
                                    className="glass-panel"
                                    style={{
                                        flex: 1,
                                        padding: "2rem",
                                        textAlign: "center",
                                        borderRadius: "1.5rem",
                                        background: "var(--background)",
                                        border: "none",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: 800,
                                            color: "var(--primary)",
                                        }}
                                    >
                                        {genderData.female}%
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "var(--muted-foreground)",
                                            marginTop: "0.5rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Feminino
                                    </div>
                                </div>
                                <div
                                    className="glass-panel"
                                    style={{
                                        flex: 1,
                                        padding: "2rem",
                                        textAlign: "center",
                                        borderRadius: "1.5rem",
                                        background: "var(--background)",
                                        border: "none",
                                    }}
                                >
                                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--foreground)" }}>{genderData.male}%</div>
                                    <div
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "var(--muted-foreground)",
                                            marginTop: "0.5rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Masculino
                                    </div>
                                </div>
                            </div>

                            <p
                                style={{
                                    color: "var(--muted-foreground)",
                                    fontSize: "0.875rem",
                                    marginTop: "2.5rem",
                                    marginBottom: "1.25rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Principais Localizações
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                                {countryData.map(
                                    (loc: any) => (
                                        <span
                                            key={loc}
                                            style={{
                                                padding: "0.6rem 1.2rem",
                                                borderRadius: "2rem",
                                                background: "var(--background)",
                                                fontSize: "0.875rem",
                                                fontWeight: 500,
                                                color: "var(--foreground)",
                                            }}
                                        >
                                            {loc}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Section: Pricing & Cases */}
                <PricingTable
                    slug={profile.username}
                    initialPackages={profile.pricing_packages}
                    isOwner={true}
                />
                <CaseStudies
                    slug={profile.username}
                    initialCases={profile.brand_cases || []}
                    isOwner={true}
                    isPro={true}
                />

                <CallToAction />

            </div>
        </main>
    );
}
