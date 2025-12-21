import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildNicheDiscoveryPrompt, buildStoryGenerationPrompt } from "./prompts";

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
        console.error("AI Niche Discovery Error:", e);
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

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        let lastError: any;

        const prompt = buildStoryGenerationPrompt(context || {});

        for (const modelName of GEMINI_MODELS) {
            try {
                console.log(`🤖 Senior PR Strategist analyzing with: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        return JSON.parse(jsonMatch[0]) as StoryResult;
                    } catch (parseError) {
                        console.error("❌ JSON Parse Error:", text);
                        continue;
                    }
                }

                throw new Error("Formato de resposta inesperado.");
            } catch (err: any) {
                lastError = err;
                console.warn(`❌ Error with model ${modelName}:`, err.message);
                if (err.message?.includes("API_KEY_INVALID")) throw err;
                continue;
            }
        }

        throw lastError || new Error("Todos os modelos de IA falharam.");
    } catch (error: any) {
        console.error("❌ Gemini AI Final Error:", error.message);
        throw new Error(`Erro na IA: ${error.message || "Problema desconhecido"}`);
    }
}

