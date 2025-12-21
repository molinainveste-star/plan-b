export function generateAIStory(profile: any, metrics: any[]) {
    const name = profile.full_name;
    const niche = profile.niche || "Criador de Conteúdo";
    const bio = profile.bio || "";

    // Extract key metrics helper
    const getMetric = (label: string) => metrics.find(m => m.label.includes(label))?.value || "0";

    const subs = getMetric("Inscritos");
    const avgViews = getMetric("Média de Views");
    const engagement = getMetric("Engajamento");
    const totalViews = getMetric("Visualizações Totais");
    const channelAge = getMetric("Tempo de Canal");
    const videoCount = getMetric("Total de Vídeos");

    const engagementValue = parseFloat(engagement.replace("%", ""));
    const isHighEngagement = engagementValue > 3.0;

    // Parse total views for logic (handle M and K)
    const totalViewsClean = totalViews.replace(/[^\d.MK]/g, "");
    let totalViewsNum = 0;
    if (totalViewsClean.includes("M")) totalViewsNum = parseFloat(totalViewsClean) * 1000000;
    else if (totalViewsClean.includes("K")) totalViewsNum = parseFloat(totalViewsClean) * 1000;
    else totalViewsNum = parseFloat(totalViewsClean) || 0;

    const isEstablished = totalViewsNum > 50000000 || (subs.includes("M") || parseFloat(subs.replace("K", "")) > 500);
    const isMegaChannel = totalViewsNum > 200000000 || (subs.includes("M") && parseFloat(subs) >= 2);

    // Narrative Roles
    let role = "Estrategista de Conteúdo";
    if (isMegaChannel) role = "Ícone de Indústria";
    else if (isHighEngagement && isEstablished) role = "Autoridade de Nicho";
    else if (isHighEngagement) role = "Estrela em Ascensão";
    else if (isEstablished) role = "Veterano da Plataforma";

    // Improved Bio Cleaning: take most descriptive sentences
    const cleanBio = bio.replace(/(http|https):\/\/[^\s]+/g, "").trim();
    const sentences = cleanBio.split(/[.!?\n]/).filter((s: string) => s.trim().length > 15);
    const bioSnippet = sentences.length > 0 ? sentences.slice(0, 2).join(". ").trim() + "." : "";

    // Determine Narrative Archetype based on Niche
    let intro = "";
    let impact = "";

    const isGaming = niche.includes("Games") || niche.includes("E-sports");

    if (isGaming) {
        if (isMegaChannel) {
            intro = `Referência no cenário de **${niche}**, **${name}** consolidou uma das maiores comunidades do segmento.`;
            impact = `Com um alcance de **${totalViews} de visualizações**, o canal dita tendências na cultura gamer. A base de **${subs} inscritos** demonstra a consistência e relevância do conteúdo ao longo dos anos.`;
        } else {
            intro = `No cenário de **${niche}**, **${name}** conecta e entretém, transformando gameplays em experiências compartilhadas.`;
            impact = `A força do canal está na comunidade: **${subs} inscritos** que acompanham fielmente. Com **${engagement} de engajamento**, a interação é um ponto forte, garantindo alcance orgânico.`;
        }
    } else if (niche.includes("Tecnologia") || niche.includes("Finanças") || niche.includes("Educação")) {
        intro = `Com foco em **${niche}**, **${name}** é uma fonte confiável de informação e análise para sua audiência.`;
        impact = `O canal funciona como um hub de conhecimento: são **${totalViews} de visualizações totais** de um público qualificado que busca profundidade e credibilidade.`;
    } else if (niche.includes("Lifestyle") || niche.includes("Moda") || niche.includes("Beleza")) {
        intro = `Através de uma estética autêntica em **${niche}**, **${name}** influencia e inspira seguidores que buscam estilo e tendências.`;
        impact = `Com uma presença de **${channelAge}**, o canal construiu uma relação de confiança. São **${totalViews} de visualizações** que validam o poder de recomendação da marca.`;
    } else {
        intro = `Explorando o universo de **${niche}**, **${name}** desenvolveu uma comunicação direta e envolvente.`;
        impact = `Com um portfólio de **${videoCount} videos**, o canal mostra constância, acumulando **${totalViews} de visualizações** e retendo a atenção do público.`;
    }

    const story = `
        ${intro}
        
        ${bioSnippet ? `Focado em *"${bioSnippet}"*, o` : "O"} projeto reflete a jornada de um(a) **${role}** que entende profundamente as necessidades de sua audiência. Atualmente, mantendo uma performance de elite com **${avgViews} visualizações por vídeo**, ${name} oferece um palco privilegiado para marcas que buscam relevância real.
        
        ${impact}
    `.trim();

    const pitch = `
        **Análise de Oportunidade:**
        
        1. **DNA de ${role}:** Combinação única de técnica e carisma, garantindo que a mensagem da marca seja entregue com naturalidade e autoridade.
        2. **Comunidade de Alto Valor:** A taxa de **${engagement}** é prova de uma audiência que não apenas consome, mas confia e age sobre as recomendações.
        3. **Escalabilidade Garantida:** Com **${totalViews} views** e crescimento sólido, a parceria oferece segurança e previsibilidade para campanhas de qualquer porte.
    `.trim();

    return { story, pitch };
}
