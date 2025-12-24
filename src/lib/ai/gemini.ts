import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildNicheDiscoveryPrompt, buildStoryGenerationPrompt } from "./prompts";
import { logger } from "@/lib/monitoring";

// Modelos em ordem de preferência
const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-flash-latest"];

export interface StoryGenerationContext {
    name?: string;
    bio?: string;
    niche?: string;
    metrics?: Array<{ label: string; value: string }>;
    videos?: Array<{ title: string; views: number; published_at: string }>;
}

export interface StoryResult {
    story: string;
    pitch: string;
}

/**
 * Fallback estático quando AI falha completamente
 */
const FALLBACK_STORIES: Record<string, StoryResult> = {
    default: {
        story: "Criador de conteúdo digital com presença consolidada no YouTube. Construindo uma comunidade engajada através de conteúdo autêntico e consistente, entregando valor real para uma audiência que confia e interage ativamente.",
        pitch: "Audiência qualificada e engajamento genuíno. Ideal para marcas que buscam conexão autêntica com seu público-alvo através de conteúdo de qualidade.",
    },
    Tech: {
        story: "Especialista em tecnologia com paixão por simplificar o complexo. Transformando inovações em conteúdo acessível para uma audiência tech-savvy que busca conhecimento prático e reviews honestos.",
        pitch: "Público altamente qualificado em tech. Perfeito para marcas de tecnologia, SaaS e produtos digitais que buscam credibilidade e conversão.",
    },
    Games: {
        story: "Gamer dedicado construindo uma comunidade vibrante de entusiastas. Gameplay envolvente, reviews sinceros e entretenimento de qualidade para uma audiência apaixonada por jogos.",
        pitch: "Comunidade gamer ativa e leal. Ideal para publishers, hardware gaming e marcas que querem conectar com o público jovem e engajado.",
    },
    Lifestyle: {
        story: "Influenciador de estilo de vida inspirando através de conteúdo autêntico. Compartilhando experiências, dicas e momentos que ressoam com uma audiência que busca inspiração diária.",
        pitch: "Audiência aspiracional e conectada. Perfeito para marcas de lifestyle, moda, beleza e produtos que valorizam estilo e autenticidade.",
    },
};

function getFallbackStory(niche?: string): StoryResult {
    if (niche && FALLBACK_STORIES[niche]) {
        return FALLBACK_STORIES[niche];
    }
    return FALLBACK_STORIES.default;
}

/**
 * Descobre o nicho usando análise multimodal (texto + imagens)
 */
export async function discoverNicheWithAI(
    description: string,
    contentData: string,
    thumbnailUrls: string[] = []
): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("⚠️ AI Niche Discovery Skipped: Missing API Key");
        return "Geral";
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Prepare Image Parts
        const imageParts: Array<{ inlineData: { data: string; mimeType: string } }> = [];
        if (thumbnailUrls.length > 0) {
            console.log(`🖼️ Fetching ${thumbnailUrls.length} thumbnails for analysis...`);
            for (const url of thumbnailUrls) {
                try {
                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    imageParts.push({
                        inlineData: {
                            data: buffer.toString("base64"),
                            mimeType: "image/jpeg",
                        },
                    });
                } catch (imgErr) {
                    console.warn(`⚠️ Failed to fetch thumbnail: ${url}`, imgErr);
                }
            }
        }

        const prompt = buildNicheDiscoveryPrompt(description, contentData);

        for (const modelName of GEMINI_MODELS) {
            try {
                console.log(`🤖 AI Analyzing Niche (Multimodal: ${modelName})...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent([prompt, ...imageParts]);
                const response = result.response;
                const niche = response.text().replace(/\n/g, "").trim();
                console.log(`✅ AI Discovery Success: ${niche}`);
                return niche;
            } catch (e: any) {
                console.warn(`⚠️ Model ${modelName} failed: ${e.message}`);
                continue;
            }
        }
    } catch (e) {
        logger.error("AI Niche Discovery failed", e, { action: 'discoverNicheWithAI' });
    }

    return "Geral";
}

/**
 * Gera história e pitch refinados via AI
 */
export async function refineStoryWithAI(
    story: string,
    pitch: string,
    context?: StoryGenerationContext
): Promise<StoryResult> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("⚠️ GEMINI_API_KEY is missing in process.env");
        return {
            story:
                story
                    .replace(/oferece/g, "entrega estrategicamente")
                    .replace(/ajuda/g, "potencializa extraordinariamente") +
                "\n\n(Aviso: GEMINI_API_KEY não detetada. Reinicia o servidor se acabaste de a adicionar.)",
            pitch: pitch
                .replace(/parceria/g, "colaboração estratégica")
                .replace(/resultados/g, "resultados exponenciais"),
        };
    }

    const timer = logger.timer('refineStoryWithAI');
    
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        let lastError: any;

        const prompt = buildStoryGenerationPrompt(context || {});

        for (const modelName of GEMINI_MODELS) {
            try {
                logger.info(`AI generating story with model: ${modelName}`, { action: 'refineStoryWithAI' });
                const model = genAI.getGenerativeModel({ model: modelName });

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        const parsed = JSON.parse(jsonMatch[0]) as StoryResult;
                        timer.end('AI story generated successfully');
                        return parsed;
                    } catch (parseError) {
                        logger.warn(`JSON parse failed for model ${modelName}`, { action: 'refineStoryWithAI' });
                        continue;
                    }
                }

                throw new Error("Formato de resposta inesperado.");
            } catch (err: any) {
                lastError = err;
                logger.warn(`Model ${modelName} failed: ${err.message}`, { action: 'refineStoryWithAI' });
                if (err.message?.includes("API_KEY_INVALID")) throw err;
                continue;
            }
        }

        throw lastError || new Error("Todos os modelos de IA falharam.");
    } catch (error: any) {
        timer.error(error, 'All AI models failed');
        
        // FALLBACK: Retorna história estática em vez de falhar
        logger.warn('Using fallback story due to AI failure', { 
            action: 'refineStoryWithAI',
            metadata: { niche: context?.niche }
        });
        return getFallbackStory(context?.niche);
    }
}

