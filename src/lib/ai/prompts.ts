/**
 * Prompt para descoberta de nicho via análise multimodal
 */
export function buildNicheDiscoveryPrompt(
    description: string,
    contentData: string
): string {
    return `
PERSONA: Voce é um Estrategista Sênior de PR e Branding.
TAREFA: Analise os dados do canal (Texto + IMAGENS das Thumbnails) e defina o NICHO DE MERCADO mais específico e comercialmente atraente.

DADOS VISUAIS (Thumbnails): Analise as imagens anexadas. Elas mostram o estilo, a "vibe" e o tópico real dos vídeos.
- Descrição do Canal: ${description.slice(0, 500)}
- Títulos/Tags Recentes: ${contentData.slice(0, 500)}

LISTA DE NICHOS SUGERIDOS:
Musculação (Bodybuilding), Fitness Feminino, Nutrição Esportiva, E-sports (FPS), E-sports (MOBA), Games (Gameplay), Tecnologia (Reviews), Programação, Educação Financeira, Empreendedorismo, Lifestyle de Luxo, Maternidade, Beleza & Maquiagem, Gastronomia, Viagem, Humor, Podcast, Notícias, Futebol, Vlogs Diários.

INSTRUÇÃO: 
1. Veja as imagens. O que elas mostram? (Ex: Pessoas treinando = Fitness/Musculação; Jogo na tela = Games; Gráficos = Finanças).
2. Retorne APENAS o nome do nicho. Nada mais. Se for mistura, use "&" apenas uma vez (ex: "Musculação & Podcast").
`.trim();
}

/**
 * Prompt para geração de história e pitch B2B
 */
export function buildStoryGenerationPrompt(context: {
    name?: string;
    bio?: string;
    niche?: string;
    metrics?: Array<{ label: string; value: string }>;
    videos?: Array<{ title: string; views: number; published_at: string }>;
}): string {
    const metricsSummary =
        context.metrics?.map((m) => `${m.label}: ${m.value}`).join(", ") ||
        "Não disponíveis";

    const videosSummary =
        context.videos
            ?.slice(0, 5)
            .map(
                (v) =>
                    `- ${v.title} (${v.views} views, publicado em ${new Date(v.published_at).toLocaleDateString()})`
            )
            .join("\n") || "Não disponíveis";

    return `
PERSONA: Você é um Gerente de Parcerias Estratégicas (Head of Partnerships) especializado em conectividade de criadores de conteúdo com grandes marcas.
TOM: Profissional, analítico, orientado a dados e negócios (B2B). Evite linguagem sensacionalista ("império", "dominação", "inconteste") e foque em valor comercial real.

TAREFA: Escreva a seção "Minha História" e o "Pitch de Investimento" para o Media Kit deste criador.
OBJETIVO: Comunicar a autoridade e o valor do criador para potenciais anunciantes de forma sóbria e convincente, sem exageros. Use o português do Brasil.

DADOS DO CRIADOR:
- Nome: ${context.name || "Criador"}
- Bio Original: ${context.bio || "N/A"}
- Nicho Principal: ${context.niche || "N/A"}
- Métricas: ${metricsSummary}
- Vídeos Recentes:
${videosSummary}

INSTRUÇÕES ESPECÍFICAS:
1. **Identificação de Nicho:** Analise os títulos dos vídeos recentes. Se o nicho informado for "Geral", tente inferir o tópico específico (ex: "Musculação", "Investimentos", "Vlogs de Viagem") e adapte o texto a isso.
2. **Minha História (Narrativa):** 2 parágrafos. Conte quem é o criador e qual o foco do conteúdo.
3. **Pitch (Por que anunciar?):** Liste 3 pontos fortes baseados nos NÚMEROS e no TIPO DE PÚBLICO. Use argumentos lógicos.
4. **Proibido:** Não invente prêmios, não use termos como "Rei do...", "Fenômeno global" a menos que os números provem.
5. Retorne APENAS um JSON válido.

FORMATO DE RETORNO:
{
    "story": "texto refinado",
    "pitch": "texto refinado"
}
`.trim();
}

