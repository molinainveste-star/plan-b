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
import { BadgeCheck, Sparkles } from "lucide-react";

// Força renderização dinâmica - sem cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MediaKitPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let profile = await getProfileBySlug(slug);

    if (!profile) {
        const mockKit = getMediaKit(slug);
        profile = {
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
            video_performance: mockKit.videoPerformance,
            custom_story: null,
            custom_pitch: null,
            brand_cases: [],
            is_verified: false,
            demographics: null,
            pricing_packages: []
        };
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

    // Todos os vídeos ordenados por data (para o gráfico)
    // Usa os vídeos reais do perfil - não usa mock para evitar dados de outro canal
    const rawVideoPerformance = profile.video_performance || [];
    
    console.log('🔍 DEBUG slug:', slug);
    console.log('🔍 DEBUG profile.username:', profile.username);
    console.log('🎬 DEBUG video_performance:', rawVideoPerformance?.length || 0, 'videos');
    if (rawVideoPerformance.length > 0) {
        console.log('🎬 Primeiro video:', rawVideoPerformance[0]?.title);
    }
    const videoData = rawVideoPerformance.length > 0 
        ? [...rawVideoPerformance].sort((a: any, b: any) =>
            new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
        ) 
        : [];
    console.log('📊 DEBUG videoData:', videoData.length, 'videos');

    // Vídeos dos últimos 30 dias, ordenados por engajamento (para destaques)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const featuredVideos = rawVideoPerformance
        ?.filter((v: any) => new Date(v.published_at) >= thirtyDaysAgo)
        .map((v: any) => ({
            ...v,
            // Score de engajamento: combina views, likes e comments
            engagementScore: (v.view_count || 0) + (v.like_count || 0) * 100 + (v.comment_count || 0) * 500
        }))
        .sort((a: any, b: any) => b.engagementScore - a.engagementScore)
        .slice(0, 6) || [];
    
    // Se não houver vídeos nos últimos 30 dias, usa os mais engajados de sempre
    const displayVideos = featuredVideos.length > 0 ? featuredVideos : 
        rawVideoPerformance
            .map((v: any) => ({
                ...v,
                engagementScore: (v.view_count || 0) + (v.like_count || 0) * 100 + (v.comment_count || 0) * 500
            }))
            .sort((a: any, b: any) => b.engagementScore - a.engagementScore)
            .slice(0, 6);

    const { story: defaultStory, pitch: defaultPitch } = generateAIStory(profile, metrics);
    const finalStory = profile.custom_story || defaultStory;
    const finalPitch = profile.custom_pitch || defaultPitch;

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
        if (d.age?.length) {
            ageData = d.age.map((item: any) => ({
                label: item.label.replace("age", ""),
                value: parseFloat(item.value).toFixed(1)
            })).sort((a: any, b: any) => b.value - a.value);
        }
        if (d.gender) {
            const male = d.gender.find((g: any) => g.label.toLowerCase().includes("male"))?.value || 0;
            const female = d.gender.find((g: any) => g.label.toLowerCase().includes("female"))?.value || 0;
            const total = male + female;
            if (total > 0) genderData = { male: Math.round((male / total) * 100), female: Math.round((female / total) * 100) };
        }
        if (d.country?.length) {
            countryData = d.country.map((c: any) => `${c.label} ${parseFloat(c.value).toFixed(0)}%`);
        }
    }

    return (
        <main 
            id="media-kit-content"
            style={{ 
                minHeight: "100vh", 
                padding: "var(--space-12) var(--space-4)", 
                background: "var(--background)", 
                paddingBottom: "var(--space-24)",
                position: "relative",
                overflow: "hidden",
            }}>
            {/* Background Effects */}
            <div style={{
                position: "fixed",
                top: "-20%",
                left: "-10%",
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%)",
                filter: "blur(80px)",
                pointerEvents: "none",
                zIndex: 0,
            }} />
            <div style={{
                position: "fixed",
                bottom: "-20%",
                right: "-10%",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 60%)",
                filter: "blur(60px)",
                pointerEvents: "none",
                zIndex: 0,
            }} />
            <div className="bg-grid" style={{ position: "fixed", inset: 0, opacity: 0.3, pointerEvents: "none", zIndex: 0 }} />

            <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <ProfileHeader
                    slug={profile.username}
                    name={profile.full_name}
                    bio={profile.bio}
                    location={profile.location || "Brasil"}
                    niche={profile.niche || "Geral"}
                    avatarUrl={profile.avatar_url}
                    socials={socialLinks}
                    pdfData={{
                        metrics: metrics.map((m: any) => ({ label: m.label, value: m.value, trend: m.trend })),
                        demographics: {
                            age: ageData.map((a: any) => ({ label: a.label, value: parseFloat(a.value) })),
                            gender: genderData,
                            countries: countryData,
                        },
                        story: finalStory,
                        pricing: (profile.pricing_packages && profile.pricing_packages.length > 0) 
                            ? profile.pricing_packages.map((p: any) => ({
                                name: p.title || p.name || "Pacote",
                                price: p.price || "A consultar",
                                features: p.features || [],
                                popular: p.isPopular || p.popular || false,
                            }))
                            : [
                                { name: "Shorts / Reels", price: "R$ 3.500", features: ["Vídeo vertical de até 60s", "Postagem no YouTube Shorts e Reels", "Link na Bio por 24h", "Direitos de uso por 30 dias"], popular: false },
                                { name: "Vídeo Dedicado", price: "R$ 8.000", features: ["Vídeo completo (8-12 min)", "Roteiro exclusivo", "Menção na descrição e comentário fixado", "Direitos de uso vitalícios"], popular: true },
                                { name: "Combo 360", price: "R$ 12.000", features: ["1 Vídeo Dedicado", "2 Shorts/Reels de corte", "Postagem em Comunidade", "Story no Instagram com Link"], popular: false },
                            ],
                        cases: (profile.brand_cases && profile.brand_cases.length > 0)
                            ? profile.brand_cases.map((c: any) => ({
                                brand: c.brandName || c.brand_name || c.brand || "Marca",
                                title: c.title || c.campaign_name || "Campanha",
                                description: c.description || c.results || "",
                                metrics: Array.isArray(c.metrics) 
                                    ? c.metrics.map((m: any) => String(m))
                                    : (c.metrics ? String(c.metrics).split("•").map((m: string) => m.trim()).filter(Boolean) : []),
                            }))
                            : [
                                { brand: "Nike", title: "Lançamento Air Max", description: "Foco em lifestyle urbano e alta performance.", metrics: ["1.2M Views", "15% CTR"] },
                                { brand: "Samsung", title: "Review Galaxy S24", description: "Demonstração de recursos de IA e câmera.", metrics: ["850k Views", "8k Comentários"] },
                                { brand: "Coca-Cola", title: "Campanha de Natal", description: "Conexão emocional e partilha.", metrics: ["2.5M Alcance", "Viralizou no TikTok"] },
                            ],
                        featuredVideos: displayVideos.slice(0, 6).map((v: any) => ({
                            title: v.title || "Vídeo",
                            views: new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(v.view_count || 0),
                            likes: new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(v.like_count || 0),
                            videoId: v.video_id,
                        })),
                    }}
                />

                {/* Stats Section Header */}
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "var(--space-3)", 
                    marginTop: "var(--space-16)", 
                    marginBottom: "var(--space-6)",
                }}>
                    <h3 style={{ 
                        fontSize: "var(--text-2xl)", 
                        fontWeight: 700, 
                        color: "var(--foreground)",
                        margin: 0,
                    }}>
                        Estatísticas do <span className="text-gradient">Canal</span>
                    </h3>
                    {profile.is_verified && (
                        <div className="badge badge-success">
                            <BadgeCheck size={14} />
                            Verificado
                        </div>
                    )}
                </div>

                {/* Metrics Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "var(--space-6)",
                }}>
                    {metrics.length > 0 ? (
                        metrics.map((metric: any, index: number) => (
                            <MetricCard key={index} {...metric} delay={index * 100} />
                        ))
                    ) : (
                        <>
                            <MetricCard label="Total de Seguidores" value="22.1K" trend="+12% este mês" trendDirection="up" icon="users" delay={0} />
                            <MetricCard label="Engajamento Médio" value="4.8%" trend="Acima da média" trendDirection="neutral" icon="activity" delay={100} />
                            <MetricCard label="Alcance Mensal" value="145K" trend="+5% este mês" trendDirection="up" icon="eye" delay={200} />
                        </>
                    )}
                </div>

                {/* Video Performance */}
                {videoData.length > 0 && (
                    <div style={{ marginTop: "var(--space-12)" }}>
                        <VideoChart data={videoData} />
                    </div>
                )}

                {/* Featured Videos - Most Engaged from Last 30 Days */}
                {displayVideos.length > 0 && (
                    <div style={{ marginTop: "var(--space-10)", animation: "fadeInUp 0.5s ease forwards", animationDelay: "250ms", opacity: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-6)" }}>
                            <h4 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
                                Destaques <span className="text-gradient">Recentes</span>
                            </h4>
                            <span style={{ fontSize: "var(--text-xs)", color: "var(--foreground-muted)", fontWeight: 500 }}>
                                📈 Ordenado por engajamento
                            </span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
                            {displayVideos.map((video: any, index: number) => (
                                <a
                                    key={video.video_id}
                                    href={`https://www.youtube.com/watch?v=${video.video_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-panel"
                                    style={{ display: "block", textDecoration: "none", overflow: "hidden", borderRadius: "var(--radius-lg)", position: "relative" }}
                                >
                                    {index === 0 && (
                                        <div style={{ 
                                            position: "absolute", 
                                            top: "var(--space-2)", 
                                            left: "var(--space-2)", 
                                            background: "var(--gradient-accent)", 
                                            padding: "var(--space-1) var(--space-2)", 
                                            borderRadius: "var(--radius-md)",
                                            fontSize: "var(--text-xs)",
                                            fontWeight: 700,
                                            color: "white",
                                            zIndex: 1
                                        }}>
                                            🔥 Top
                                        </div>
                                    )}
                                    <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                                        <img
                                            src={`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`}
                                            alt={video.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform var(--transition-slow)" }}
                                        />
                                    </div>
                                    <div style={{ padding: "var(--space-3)" }}>
                                        <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", lineHeight: "1.3", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {video.title}
                                        </p>
                                        <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
                                            <span style={{ fontSize: "var(--text-xs)", color: "var(--foreground-muted)" }}>
                                                👁 {new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(video.view_count)}
                                            </span>
                                            <span style={{ fontSize: "var(--text-xs)", color: "var(--foreground-muted)" }}>
                                                ❤️ {new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(video.like_count || 0)}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Story Section */}
                <div
                    className="glass-panel"
                    style={{
                        marginTop: "var(--space-16)",
                        padding: "var(--space-10)",
                        borderRadius: "var(--radius-2xl)",
                        position: "relative",
                        overflow: "hidden",
                        animation: "fadeInUp 0.5s ease forwards",
                        animationDelay: "300ms",
                        opacity: 0,
                    }}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--gradient-accent)" }} />
                    
                    <div style={{ position: "absolute", top: "var(--space-6)", right: "var(--space-8)" }}>
                        <span style={{
                            padding: "var(--space-2) var(--space-4)",
                            background: "var(--gradient-accent)",
                            borderRadius: "var(--radius-full)",
                            fontSize: "var(--text-xs)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-1)",
                            boxShadow: "var(--shadow-glow-accent)",
                        }}>
                            <Sparkles size={12} />
                            IA Insight
                        </span>
                    </div>

                    <h3 style={{ marginBottom: "var(--space-8)", fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--foreground)" }}>
                        Minha <span className="text-gradient-accent">História</span>
                    </h3>

                    <EditableStory
                        slug={profile.username}
                        initialStory={finalStory}
                        initialPitch={finalPitch}
                        isPlaceholder={!profile.custom_story}
                        context={{ name: profile.full_name, bio: profile.bio, niche: profile.niche, metrics, videos: videoData }}
                    />
                </div>

                {/* Demographics */}
                <div
                    className="glass-panel"
                    style={{
                        marginTop: "var(--space-12)",
                        padding: "var(--space-8)",
                        borderRadius: "var(--radius-2xl)",
                        animation: "fadeInUp 0.5s ease forwards",
                        animationDelay: "350ms",
                        opacity: 0,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-8)", flexWrap: "wrap", gap: "var(--space-4)" }}>
                        <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
                            Demografia da <span className="text-gradient">Audiência</span>
                        </h3>
                        {profile.is_verified ? (
                            <div className="badge badge-success">
                                <BadgeCheck size={14} />
                                Dados verificados
                            </div>
                        ) : (
                            <ConnectYouTube slug={profile.username} />
                        )}
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-10)" }}>
                        {/* Age */}
                        <div>
                            <p style={{ color: "var(--foreground-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Faixa Etária</p>
                            {ageData.map((item: any) => (
                                <div key={item.label} style={{ marginBottom: "var(--space-4)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>
                                        <span style={{ color: "var(--foreground-secondary)" }}>{item.label}</span>
                                        <span style={{ color: "var(--primary)", fontWeight: 700 }}>{item.value}%</span>
                                    </div>
                                    <div style={{ height: "6px", background: "var(--background-tertiary)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                                        <div style={{ width: `${item.value}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: "var(--radius-full)" }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gender & Location */}
                        <div>
                            <p style={{ color: "var(--foreground-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Gênero</p>
                            <div style={{ display: "flex", gap: "var(--space-4)" }}>
                                <div style={{ flex: 1, padding: "var(--space-5)", textAlign: "center", borderRadius: "var(--radius-xl)", background: "var(--background-tertiary)", border: "1px solid var(--border)" }}>
                                    <div className="text-gradient" style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>{genderData.female}%</div>
                                    <div style={{ fontSize: "var(--text-xs)", color: "var(--foreground-muted)", marginTop: "var(--space-1)", fontWeight: 600, textTransform: "uppercase" }}>Feminino</div>
                                </div>
                                <div style={{ flex: 1, padding: "var(--space-5)", textAlign: "center", borderRadius: "var(--radius-xl)", background: "var(--background-tertiary)", border: "1px solid var(--border)" }}>
                                    <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--foreground)" }}>{genderData.male}%</div>
                                    <div style={{ fontSize: "var(--text-xs)", color: "var(--foreground-muted)", marginTop: "var(--space-1)", fontWeight: 600, textTransform: "uppercase" }}>Masculino</div>
                                </div>
                            </div>

                            <p style={{ color: "var(--foreground-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-8)", marginBottom: "var(--space-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Localização</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                                {countryData.map((loc: any) => (
                                    <span key={loc} style={{ padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", background: "var(--background-tertiary)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--foreground-secondary)", border: "1px solid var(--border)" }}>
                                        {loc}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <PricingTable slug={profile.username} initialPackages={profile.pricing_packages} isOwner={true} />
                <CaseStudies slug={profile.username} initialCases={profile.brand_cases || []} isOwner={true} isPro={true} />
                <CallToAction />
            </div>
        </main>
    );
}
