"use server";

import { refineStoryWithAI as refineStory, type StoryGenerationContext } from "@/lib/ai";

/**
 * Re-export da função de refinamento de história
 * Wrapper para manter compatibilidade com código existente
 */
export async function refineStoryWithAI(
    story: string,
    pitch: string,
    context?: StoryGenerationContext
) {
    return refineStory(story, pitch, context);
}

