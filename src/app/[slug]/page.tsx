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
    console.log(`👤 Profile result for '${slug}':`, profile ? "Found" : "Not Found");

    if (!profile) {
        console.warn(`⚠️ Profile not found in DB for slug: '${slug}'. Using Mock Data fallbacks.`);
        const mockKit = getMediaKit(slug);

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
            video_performance: [],
            custom_story: null,
            custom_pitch: null,
            brand_cases: [],
            is_verified: false,
            demographics: null,
            pricing_packages: []
        };

        profile = mockProfile;
    }

    if (profile) {
        console.log(`🔍 Profile Data for '${slug}':`, JSON.stringify({
            username: profile.username,
            metrics_count: profile.metrics?.length,
            has_story: !!profile.custom_story,
            metrics_raw: profile.metrics
        }, null, 2));
    }

    const metrics = profile.metrics
        ?.filter((m: any) => m && m.label && m.value)
        .map((m: any) => ({
            label: m.label,
            value: m.value,
            trend: m.trend,
            trendDirection: m.trend_direction as "up" | "down" | "neutral",
            icon: m.icon,
        })) || [];

    const socialLinks = profile.social_accounts?.map((s: any) => ({
        platform: s.platform as "Instagram" | "TikTok" | "YouTube" | "Twitter",
        handle: s.handle,
        url: s.url,
    })) || [];

    const videoData = profile.video_performance?.sort((a: any, b: any) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    ) || [];

    const { story: defaultStory, pitch: defaultPitch } = generateAIStory(profile, metrics);
    const finalStory = profile.custom_story || defaultStory;
    const finalPitch = profile.custom_pitch || defaultPitch;

    // Demographics Data
    let ageData = [
        { label: "18-24", value: 35 },
        { label: "25-34", value: 45 },
        { label: "35-44", value: 15 },
        { label: "45+", value: 5 },
    ];
    let genderData = { female: 72, male: 28 };
    let countryData = ["Brasil 65%", "Portugal 15%", "EUA 10%", "Outros 10%"];

    if (profile.demographics && profile.is_verified) {
        const d = profile.demographics;

        if (d.age && d.age.length > 0) {
            ageData = d.age.map((item: any) => ({
                label: item.label.replace("age", ""),
                value: parseFloat(item.value).toFixed(1)
            })).sort((a: any, b: any) => b.value - a.value);
        }

        if (d.gender) {
            const male = d.gender.find((g: any) => g.label.toLowerCase().includes("male"))?.value || 0;
            const female = d.gender.find((g: any) => g.label.toLowerCase().includes("female"))?.value || 0;
            const total = male + female;
            if (total > 0) {
                genderData = {
                    male: Math.round((male / total) * 100),
                    female: Math.round((female / total) * 100)
                };
            }
        }

        if (d.country && d.country.length > 0) {
            countryData = d.country.map((c: any) => `${c.label} ${parseFloat(c.value).toFixed(0)}%`);
        }
    }

    return (
        <main style={{ 
            minHeight: "100vh", 
            padding: "var(--space-12) var(--space-4)", 
            background: "var(--gradient-surface)", 
            paddingBottom: "var(--space-24)",
        }}>
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

                {/* Section Header: Channel Stats */}
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "var(--space-3)", 
                    marginTop: "var(--space-12)", 
                    marginBottom: "var(--space-6)",
                }}>
                    <h3 style={{ 
                        fontSize: "var(--text-xl)", 
                        fontWeight: 600, 
                        color: "var(--foreground)",
                        margin: 0,
                    }}>
                        Estatísticas do Canal
                    </h3>
                    {profile.is_verified && (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-1)",
                            background: "var(--success-light)",
                            color: "var(--success)",
                            padding: "var(--space-1) var(--space-3)",
                            borderRadius: "var(--radius-full)",
                            fontSize: "var(--text-xs)",
                            fontWeight: 600,
                        }}>
                            <BadgeCheck size={14} />
                            Verificado
                        </div>
                    )}
                </div>

                {/* Metrics Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "var(--space-6)",
                    }}
                >
                    {metrics.length > 0 ? (
                        metrics.map((metric: any, index: number) => (
                            <MetricCard key={index} {...metric} delay={index * 50} />
                        ))
                    ) : (
                        <>
                            <MetricCard
                                label="Total de Seguidores"
                                value="22.1K"
                                trend="+12% este mês"
                                trendDirection="up"
                                icon="users"
                                delay={0}
                            />
                            <MetricCard
                                label="Engajamento Médio"
                                value="4.8%"
                                trend="Média do setor: 2.1%"
                                trendDirection="neutral"
                                icon="activity"
                                delay={50}
                            />
                            <MetricCard
                                label="Alcance Mensal"
                                value="145K"
                                trend="+5% este mês"
                                trendDirection="up"
                                icon="eye"
                                delay={100}
                            />
                        </>
                    )}
                </div>

                {/* Video Performance Chart */}
                {videoData.length > 0 && (
                    <div style={{ marginTop: "var(--space-10)" }}>
                        <VideoChart data={videoData} />
                    </div>
                )}

                {/* Recent Video Thumbnails */}
                {videoData.length > 0 && (
                    <div 
                        className="print-thumbnails" 
                        style={{ 
                            marginTop: "var(--space-8)", 
                            marginBottom: "var(--space-8)",
                            animation: "fadeInUp 0.4s ease forwards",
                            animationDelay: "200ms",
                            opacity: 0,
                        }}
                    >
                        <h4 style={{ 
                            fontSize: "var(--text-lg)", 
                            fontWeight: 600, 
                            marginBottom: "var(--space-4)", 
                            color: "var(--foreground)",
                        }}>
                            Destaques Recentes
                        </h4>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "var(--space-4)",
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
                                            borderRadius: "var(--radius-md)",
                                            overflow: "hidden",
                                            marginBottom: "var(--space-2)",
                                            border: "1px solid var(--border)",
                                            background: "var(--secondary)",
                                            boxShadow: "var(--shadow-sm)",
                                            transition: "all var(--transition-base)",
                                        }}>
                                            <img
                                                src={`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`}
                                                alt={video.title}
                                                style={{ 
                                                    width: "100%", 
                                                    height: "100%", 
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <p style={{
                                            fontSize: "var(--text-sm)",
                                            fontWeight: 500,
                                            lineHeight: "var(--leading-snug)",
                                            color: "var(--foreground)",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}>
                                            {video.title}
                                        </p>
                                    </a>
                                    <p style={{ 
                                        fontSize: "var(--text-xs)", 
                                        color: "var(--muted-foreground)", 
                                        marginTop: "var(--space-1)",
                                    }}>
                                        {new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(video.view_count)} views
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Story Section */}
                <div
                    className="glass-panel"
                    style={{
                        marginTop: "var(--space-12)",
                        padding: "var(--space-10)",
                        borderRadius: "var(--radius-xl)",
                        position: "relative",
                        overflow: "hidden",
                        animation: "fadeInUp 0.4s ease forwards",
                        animationDelay: "250ms",
                        opacity: 0,
                    }}
                >
                    {/* AI Badge */}
                    <div style={{ position: "absolute", top: "var(--space-6)", right: "var(--space-8)" }}>
                        <span 
                            className="ia-insight-badge" 
                            style={{
                                padding: "var(--space-2) var(--space-4)",
                                background: "var(--gradient-accent)",
                                borderRadius: "var(--radius-full)",
                                fontSize: "var(--text-xs)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "white",
                                boxShadow: "var(--shadow-primary)",
                            }}
                        >
                            IA Insight
                        </span>
                    </div>

                    <h3 style={{
                        marginBottom: "var(--space-8)",
                        fontSize: "var(--text-3xl)",
                        fontWeight: 700,
                        letterSpacing: "var(--tracking-tight)",
                        color: "var(--foreground)",
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
                        marginTop: "var(--space-10)",
                        padding: "var(--space-8)",
                        borderRadius: "var(--radius-xl)",
                        animation: "fadeInUp 0.4s ease forwards",
                        animationDelay: "300ms",
                        opacity: 0,
                    }}
                >
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                        marginBottom: "var(--space-8)", 
                        flexWrap: "wrap", 
                        gap: "var(--space-4)",
                    }}>
                        <h3 style={{ 
                            fontSize: "var(--text-xl)", 
                            fontWeight: 600, 
                            color: "var(--foreground)", 
                            margin: 0,
                        }}>
                            Demografia da Audiência
                        </h3>
                        {profile.is_verified ? (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--space-2)",
                                background: "var(--success-light)",
                                color: "var(--success)",
                                padding: "var(--space-2) var(--space-4)",
                                borderRadius: "var(--radius-full)",
                                fontSize: "var(--text-sm)",
                                fontWeight: 600,
                                border: "1px solid rgba(16, 185, 129, 0.2)",
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
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "var(--space-10)",
                        }}
                    >
                        {/* Age Distribution */}
                        <div>
                            <p style={{
                                color: "var(--muted-foreground)",
                                fontSize: "var(--text-sm)",
                                marginBottom: "var(--space-4)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}>
                                Faixa Etária
                            </p>
                            {ageData.map((item: any) => (
                                <div key={item.label} style={{ marginBottom: "var(--space-4)" }}>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "var(--text-sm)",
                                        marginBottom: "var(--space-2)",
                                        fontWeight: 500,
                                    }}>
                                        <span style={{ color: "var(--foreground)" }}>{item.label}</span>
                                        <span style={{ color: "var(--primary)", fontWeight: 600 }}>{item.value}%</span>
                                    </div>
                                    <div style={{
                                        height: "6px",
                                        background: "var(--secondary)",
                                        borderRadius: "var(--radius-full)",
                                        overflow: "hidden",
                                    }}>
                                        <div style={{
                                            width: `${item.value}%`,
                                            height: "100%",
                                            background: "var(--gradient-accent)",
                                            borderRadius: "var(--radius-full)",
                                            transition: "width 0.5s ease",
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gender & Location */}
                        <div>
                            <p style={{
                                color: "var(--muted-foreground)",
                                fontSize: "var(--text-sm)",
                                marginBottom: "var(--space-4)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}>
                                Gênero
                            </p>
                            <div style={{ display: "flex", gap: "var(--space-4)" }}>
                                <div
                                    className="glass-panel"
                                    style={{
                                        flex: 1,
                                        padding: "var(--space-5)",
                                        textAlign: "center",
                                        borderRadius: "var(--radius-lg)",
                                        background: "var(--secondary)",
                                        border: "none",
                                    }}
                                >
                                    <div style={{
                                        fontSize: "var(--text-3xl)",
                                        fontWeight: 700,
                                        color: "var(--primary)",
                                    }}>
                                        {genderData.female}%
                                    </div>
                                    <div style={{
                                        fontSize: "var(--text-xs)",
                                        color: "var(--muted-foreground)",
                                        marginTop: "var(--space-1)",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}>
                                        Feminino
                                    </div>
                                </div>
                                <div
                                    className="glass-panel"
                                    style={{
                                        flex: 1,
                                        padding: "var(--space-5)",
                                        textAlign: "center",
                                        borderRadius: "var(--radius-lg)",
                                        background: "var(--secondary)",
                                        border: "none",
                                    }}
                                >
                                    <div style={{ 
                                        fontSize: "var(--text-3xl)", 
                                        fontWeight: 700, 
                                        color: "var(--foreground)",
                                    }}>
                                        {genderData.male}%
                                    </div>
                                    <div style={{
                                        fontSize: "var(--text-xs)",
                                        color: "var(--muted-foreground)",
                                        marginTop: "var(--space-1)",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}>
                                        Masculino
                                    </div>
                                </div>
                            </div>

                            <p style={{
                                color: "var(--muted-foreground)",
                                fontSize: "var(--text-sm)",
                                marginTop: "var(--space-8)",
                                marginBottom: "var(--space-4)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}>
                                Principais Localizações
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                                {countryData.map((loc: any) => (
                                    <span
                                        key={loc}
                                        style={{
                                            padding: "var(--space-2) var(--space-4)",
                                            borderRadius: "var(--radius-full)",
                                            background: "var(--secondary)",
                                            fontSize: "var(--text-sm)",
                                            fontWeight: 500,
                                            color: "var(--foreground)",
                                        }}
                                    >
                                        {loc}
                                    </span>
                                ))}
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
