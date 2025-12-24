/**
 * Prompts de IA do PubliScore
 * 
 * Este arquivo mantém compatibilidade com o código existente,
 * re-exportando as funções do novo sistema de personas.
 * 
 * @deprecated Preferir importar diretamente de '@/lib/ai/personas'
 * 
 * @example
 * ```ts
 * // Novo (recomendado)
 * import { buildPrompt, buildStoryGenerationPrompt } from '@/lib/ai/personas';
 * 
 * // Legado (ainda funciona)
 * import { buildNicheDiscoveryPrompt, buildStoryGenerationPrompt } from '@/lib/ai/prompts';
 * ```
 */

// Re-export das funções de prompt do novo sistema de personas
// Mantém 100% de compatibilidade com imports existentes
export { 
    buildNicheDiscoveryPrompt,
    buildStoryGenerationPrompt 
} from './personas';

// Export adicional do novo sistema para facilitar migração
export { 
    buildPrompt,
    personas,
    getPersona,
    promptDescriptions,
    type PersonaContext,
    type PromptType,
    type PromptOptions
} from './personas';
