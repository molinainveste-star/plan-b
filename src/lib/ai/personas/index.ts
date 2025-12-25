/**
 * Sistema de Personas do Provly
 * 
 * Módulo centralizado para gerenciamento de personas especializadas em IA.
 * Cada persona é otimizada para um aspecto específico do processo de
 * criação de Media Kits e estratégia para criadores de conteúdo.
 * 
 * @example
 * ```ts
 * import { personas, getPersona, buildPrompt } from '@/lib/ai/personas';
 * 
 * // Listar todas as personas
 * console.log(personas.map(p => p.name));
 * 
 * // Obter uma persona específica
 * const cmo = getPersona('cmo-global');
 * 
 * // Construir prompt para uma tarefa
 * const prompt = buildPrompt('global-expansion', context);
 * ```
 */

// Types
export * from './types';
export type {
    PersonaId,
    PersonaTone,
    PersonaFocus,
    PersonaConfig,
    PersonaContext,
    PersonaOutput,
    StoryPitchOutput,
    NicheAnalysisOutput,
    GrowthStrategyOutput,
    DataInsightsOutput,
    ConversionCopyOutput,
    ComplianceAuditOutput,
    ContractAnalysisOutput,
    DataMappingOutput
} from './types';

// ============================================
// PERSONAS EXPORTS
// ============================================

// Persona 1: Estrategista de PR
export { 
    default as ESTRATEGISTA_PR, 
    buildNicheDiscoveryPrompt, 
    buildBrandPositioningPrompt 
} from './estrategista-pr';

// Persona 2: Head of Partnerships
export { 
    default as HEAD_PARTNERSHIPS, 
    buildStoryGenerationPrompt, 
    buildPartnershipAnalysisPrompt 
} from './head-partnerships';

// Persona 3: CMO Global
export { 
    default as CMO_GLOBAL, 
    buildGlobalExpansionPrompt, 
    buildCompetitiveAnalysisPrompt, 
    buildPricingStrategyPrompt 
} from './cmo-global';

// Persona 4: Analista de Dados
export { 
    default as ANALISTA_DADOS, 
    buildPerformanceAnalysisPrompt, 
    buildAudienceInsightsPrompt, 
    buildBenchmarkComparisonPrompt 
} from './analista-dados';

// Persona 5: Copywriter (B2B / Media Kit)
export { 
    default as COPYWRITER, 
    buildMediaKitCopyPrompt, 
    buildHeadlineVariationsPrompt, 
    buildPitchEmailPrompt, 
    buildPackageDescriptionPrompt, 
    COPY_FRAMEWORKS 
} from './copywriter';

// Persona 6: Copywriter Elite (Vendas Diretas)
export { 
    default as COPYWRITER_ELITE,
    buildHeadlinePrompt,
    buildLandingPageCopyPrompt,
    buildEmailSequencePrompt,
    buildAdCopyPrompt,
    buildSalesPitchPrompt,
    buildConversionBulletsPrompt
} from './copywriter-elite';

// Persona 7: Guardião Jurídico (Compliance)
export { 
    default as GUARDIAO_JURIDICO,
    buildComplianceAuditPrompt,
    buildContractAnalysisPrompt,
    buildDataMappingPrompt,
    buildTermsReviewPrompt,
    buildDueDiligenceChecklistPrompt
} from './guardiao-juridico';

// ============================================
// IMPORTS INTERNOS
// ============================================

import { ESTRATEGISTA_PR } from './estrategista-pr';
import { HEAD_PARTNERSHIPS } from './head-partnerships';
import { CMO_GLOBAL } from './cmo-global';
import { ANALISTA_DADOS } from './analista-dados';
import { COPYWRITER } from './copywriter';
import { COPYWRITER_ELITE } from './copywriter-elite';
import { GUARDIAO_JURIDICO } from './guardiao-juridico';
import type { PersonaConfig, PersonaId, PersonaContext } from './types';

// Prompt builders
import { buildNicheDiscoveryPrompt, buildBrandPositioningPrompt } from './estrategista-pr';
import { buildStoryGenerationPrompt, buildPartnershipAnalysisPrompt } from './head-partnerships';
import { buildGlobalExpansionPrompt, buildCompetitiveAnalysisPrompt, buildPricingStrategyPrompt } from './cmo-global';
import { buildPerformanceAnalysisPrompt, buildAudienceInsightsPrompt, buildBenchmarkComparisonPrompt } from './analista-dados';
import { buildMediaKitCopyPrompt, buildHeadlineVariationsPrompt, buildPitchEmailPrompt, buildPackageDescriptionPrompt } from './copywriter';
import { buildHeadlinePrompt, buildLandingPageCopyPrompt, buildEmailSequencePrompt, buildAdCopyPrompt, buildSalesPitchPrompt, buildConversionBulletsPrompt } from './copywriter-elite';
import { buildComplianceAuditPrompt, buildContractAnalysisPrompt, buildDataMappingPrompt, buildTermsReviewPrompt, buildDueDiligenceChecklistPrompt } from './guardiao-juridico';

// ============================================
// PERSONAS REGISTRY
// ============================================

/**
 * Lista completa de personas disponíveis
 */
export const personas: PersonaConfig[] = [
    ESTRATEGISTA_PR,
    HEAD_PARTNERSHIPS,
    CMO_GLOBAL,
    ANALISTA_DADOS,
    COPYWRITER,
    COPYWRITER_ELITE,
    GUARDIAO_JURIDICO
];

/**
 * Mapa de personas por ID para acesso rápido
 */
export const personaMap: Record<PersonaId, PersonaConfig> = {
    'estrategista-pr': ESTRATEGISTA_PR,
    'head-partnerships': HEAD_PARTNERSHIPS,
    'cmo-global': CMO_GLOBAL,
    'analista-dados': ANALISTA_DADOS,
    'copywriter': COPYWRITER,
    'copywriter-elite': COPYWRITER_ELITE,
    'guardiao-juridico': GUARDIAO_JURIDICO
};

/**
 * Obtém uma persona pelo ID
 */
export function getPersona(id: PersonaId): PersonaConfig {
    const persona = personaMap[id];
    if (!persona) {
        throw new Error(`Persona não encontrada: ${id}`);
    }
    return persona;
}

// ============================================
// PROMPT SYSTEM
// ============================================

/**
 * Tipos de prompt disponíveis por persona
 */
export type PromptType = 
    // Estrategista PR
    | 'niche-discovery'
    | 'brand-positioning'
    // Head Partnerships
    | 'story-generation'
    | 'partnership-analysis'
    // CMO Global
    | 'global-expansion'
    | 'competitive-analysis'
    | 'pricing-strategy'
    // Analista Dados
    | 'performance-analysis'
    | 'audience-insights'
    | 'benchmark-comparison'
    // Copywriter (B2B)
    | 'media-kit-copy'
    | 'headline-variations'
    | 'pitch-email'
    | 'package-description'
    // Copywriter Elite (Vendas)
    | 'sales-headline'
    | 'landing-page-copy'
    | 'email-sequence'
    | 'ad-copy'
    | 'sales-pitch'
    | 'conversion-bullets'
    // Guardião Jurídico
    | 'compliance-audit'
    | 'contract-analysis'
    | 'data-mapping'
    | 'terms-review'
    | 'due-diligence';

/**
 * Mapeamento de tipos de prompt para personas
 */
export const promptPersonaMapping: Record<PromptType, PersonaId> = {
    // Estrategista PR
    'niche-discovery': 'estrategista-pr',
    'brand-positioning': 'estrategista-pr',
    // Head Partnerships
    'story-generation': 'head-partnerships',
    'partnership-analysis': 'head-partnerships',
    // CMO Global
    'global-expansion': 'cmo-global',
    'competitive-analysis': 'cmo-global',
    'pricing-strategy': 'cmo-global',
    // Analista Dados
    'performance-analysis': 'analista-dados',
    'audience-insights': 'analista-dados',
    'benchmark-comparison': 'analista-dados',
    // Copywriter B2B
    'media-kit-copy': 'copywriter',
    'headline-variations': 'copywriter',
    'pitch-email': 'copywriter',
    'package-description': 'copywriter',
    // Copywriter Elite
    'sales-headline': 'copywriter-elite',
    'landing-page-copy': 'copywriter-elite',
    'email-sequence': 'copywriter-elite',
    'ad-copy': 'copywriter-elite',
    'sales-pitch': 'copywriter-elite',
    'conversion-bullets': 'copywriter-elite',
    // Guardião Jurídico
    'compliance-audit': 'guardiao-juridico',
    'contract-analysis': 'guardiao-juridico',
    'data-mapping': 'guardiao-juridico',
    'terms-review': 'guardiao-juridico',
    'due-diligence': 'guardiao-juridico'
};

/**
 * Interface para opções extras de prompt
 */
export interface PromptOptions {
    // Comum
    description?: string;
    contentData?: string;
    
    // CMO Global
    competitors?: string[];
    
    // Analista de Dados
    benchmarks?: {
        avgEngagement: number;
        avgViewsPerVideo: number;
        avgSubGrowth: number;
    };
    
    // Copywriter B2B
    headlinePurpose?: 'media-kit' | 'pitch-email' | 'social-post' | 'ad';
    brandName?: string;
    brandIndustry?: string;
    
    // Copywriter Elite
    emailSequenceType?: 'cold_outreach' | 'nurture' | 'launch';
    adPlatform?: 'meta' | 'youtube' | 'linkedin';
    
    // Guardião Jurídico
    companyInfo?: {
        name: string;
        sector: string;
        hasInternationalUsers: boolean;
        dataProcessingActivities: string[];
    };
    existingPolicies?: {
        termsOfService: boolean;
        privacyPolicy: boolean;
        cookiePolicy: boolean;
        dataRetentionPolicy: boolean;
    };
    contractType?: string;
    contractSummary?: string;
    keyTerms?: string[];
    currentTerms?: string;
    businessModel?: string;
    companyProfile?: {
        name: string;
        sector: string;
        stage: string;
        teamSize: number;
        hasInvestors: boolean;
        intendedTransaction: 'acquisition' | 'investment' | 'merger' | 'ipo';
    };
}

/**
 * Constrói um prompt baseado no tipo e contexto
 */
export function buildPrompt(
    promptType: PromptType,
    context: PersonaContext,
    options?: PromptOptions
): string {
    switch (promptType) {
        // ============ Estrategista PR ============
        case 'niche-discovery':
            return buildNicheDiscoveryPrompt(
                options?.description || context.creator?.bio || '',
                options?.contentData || ''
            );
        case 'brand-positioning':
            return buildBrandPositioningPrompt(context);
        
        // ============ Head Partnerships ============
        case 'story-generation':
            return buildStoryGenerationPrompt(context);
        case 'partnership-analysis':
            return buildPartnershipAnalysisPrompt(context);
        
        // ============ CMO Global ============
        case 'global-expansion':
            return buildGlobalExpansionPrompt(context);
        case 'competitive-analysis':
            return buildCompetitiveAnalysisPrompt(context, options?.competitors);
        case 'pricing-strategy':
            return buildPricingStrategyPrompt(context);
        
        // ============ Analista Dados ============
        case 'performance-analysis':
            return buildPerformanceAnalysisPrompt(context);
        case 'audience-insights':
            return buildAudienceInsightsPrompt(context);
        case 'benchmark-comparison':
            return buildBenchmarkComparisonPrompt(context, options?.benchmarks);
        
        // ============ Copywriter B2B ============
        case 'media-kit-copy':
            return buildMediaKitCopyPrompt(context);
        case 'headline-variations':
            return buildHeadlineVariationsPrompt(
                context,
                options?.headlinePurpose || 'media-kit'
            );
        case 'pitch-email':
            return buildPitchEmailPrompt(
                context,
                options?.brandName,
                options?.brandIndustry
            );
        case 'package-description':
            return buildPackageDescriptionPrompt(context);
        
        // ============ Copywriter Elite ============
        case 'sales-headline':
            return buildHeadlinePrompt(context);
        case 'landing-page-copy':
            return buildLandingPageCopyPrompt(context);
        case 'email-sequence':
            return buildEmailSequencePrompt(
                context,
                options?.emailSequenceType || 'cold_outreach'
            );
        case 'ad-copy':
            return buildAdCopyPrompt(
                context,
                options?.adPlatform || 'meta'
            );
        case 'sales-pitch':
            return buildSalesPitchPrompt(context);
        case 'conversion-bullets':
            return buildConversionBulletsPrompt(context);
        
        // ============ Guardião Jurídico ============
        case 'compliance-audit':
            return buildComplianceAuditPrompt({
                ...context,
                companyInfo: options?.companyInfo,
                existingPolicies: options?.existingPolicies
            });
        case 'contract-analysis':
            return buildContractAnalysisPrompt(
                options?.contractType || 'Contrato de Parceria',
                options?.contractSummary || '',
                options?.keyTerms
            );
        case 'data-mapping':
            return buildDataMappingPrompt(context);
        case 'terms-review':
            return buildTermsReviewPrompt(
                options?.currentTerms || '',
                options?.businessModel || ''
            );
        case 'due-diligence':
            if (!options?.companyProfile) {
                throw new Error('companyProfile é obrigatório para due-diligence');
            }
            return buildDueDiligenceChecklistPrompt(options.companyProfile);
        
        default:
            throw new Error(`Tipo de prompt desconhecido: ${promptType}`);
    }
}

/**
 * Obtém a persona responsável por um tipo de prompt
 */
export function getPersonaForPrompt(promptType: PromptType): PersonaConfig {
    const personaId = promptPersonaMapping[promptType];
    return getPersona(personaId);
}

// ============================================
// METADATA & DESCRIPTIONS
// ============================================

/**
 * Descrições amigáveis dos tipos de prompt para UI
 */
export const promptDescriptions: Record<PromptType, { label: string; description: string; category: string }> = {
    // Estrategista PR
    'niche-discovery': {
        label: 'Descoberta de Nicho',
        description: 'Identifica o nicho de mercado ideal via análise multimodal',
        category: 'Branding'
    },
    'brand-positioning': {
        label: 'Posicionamento de Marca',
        description: 'Desenvolve estratégia de posicionamento e diferenciação',
        category: 'Branding'
    },
    
    // Head Partnerships
    'story-generation': {
        label: 'História & Pitch',
        description: 'Gera narrativa profissional e argumentos de venda B2B',
        category: 'Parcerias'
    },
    'partnership-analysis': {
        label: 'Análise de Parcerias',
        description: 'Identifica oportunidades e sugere rate card',
        category: 'Parcerias'
    },
    
    // CMO Global
    'global-expansion': {
        label: 'Estratégia Global',
        description: 'Plano de expansão Brasil + Internacional',
        category: 'Crescimento'
    },
    'competitive-analysis': {
        label: 'Análise Competitiva',
        description: 'Mapeia concorrentes e oportunidades de diferenciação',
        category: 'Crescimento'
    },
    'pricing-strategy': {
        label: 'Estratégia de Preços',
        description: 'Sugere rate card competitivo com justificativas',
        category: 'Crescimento'
    },
    
    // Analista Dados
    'performance-analysis': {
        label: 'Análise de Performance',
        description: 'Deep-dive em métricas com insights acionáveis',
        category: 'Analytics'
    },
    'audience-insights': {
        label: 'Insights de Audiência',
        description: 'Perfil demográfico e comportamental da audiência',
        category: 'Analytics'
    },
    'benchmark-comparison': {
        label: 'Comparação com Benchmark',
        description: 'Performance vs. mercado e concorrentes',
        category: 'Analytics'
    },
    
    // Copywriter B2B
    'media-kit-copy': {
        label: 'Copy do Media Kit',
        description: 'Textos persuasivos para o Media Kit completo',
        category: 'Copy B2B'
    },
    'headline-variations': {
        label: 'Variações de Headlines',
        description: 'Headlines para A/B testing',
        category: 'Copy B2B'
    },
    'pitch-email': {
        label: 'Email de Pitch',
        description: 'Email de prospecção para marcas',
        category: 'Copy B2B'
    },
    'package-description': {
        label: 'Descrição de Pacotes',
        description: 'Copy persuasivo para tabela de preços',
        category: 'Copy B2B'
    },
    
    // Copywriter Elite
    'sales-headline': {
        label: 'Headlines de Vendas',
        description: 'Headlines magnéticas para conversão direta',
        category: 'Vendas'
    },
    'landing-page-copy': {
        label: 'Copy de Landing Page',
        description: 'Copy completo de página de vendas',
        category: 'Vendas'
    },
    'email-sequence': {
        label: 'Sequência de Emails',
        description: 'Emails de vendas automatizados',
        category: 'Vendas'
    },
    'ad-copy': {
        label: 'Copy de Anúncios',
        description: 'Copy para Meta, YouTube e LinkedIn Ads',
        category: 'Vendas'
    },
    'sales-pitch': {
        label: 'Pitch de Vendas',
        description: 'Pitch para WhatsApp, DM e Email',
        category: 'Vendas'
    },
    'conversion-bullets': {
        label: 'Bullets de Conversão',
        description: 'Transforma métricas em argumentos de venda',
        category: 'Vendas'
    },
    
    // Guardião Jurídico
    'compliance-audit': {
        label: 'Auditoria de Compliance',
        description: 'Análise LGPD/GDPR para due diligence',
        category: 'Legal'
    },
    'contract-analysis': {
        label: 'Análise de Contratos',
        description: 'Revisão jurídica de contratos',
        category: 'Legal'
    },
    'data-mapping': {
        label: 'Mapeamento de Dados',
        description: 'ROPA e inventário de dados pessoais',
        category: 'Legal'
    },
    'terms-review': {
        label: 'Revisão de Termos',
        description: 'Análise de Termos de Uso',
        category: 'Legal'
    },
    'due-diligence': {
        label: 'Checklist Due Diligence',
        description: 'Preparação para M&A/investimento',
        category: 'Legal'
    }
};

/**
 * Agrupa prompts por categoria
 */
export function getPromptsByCategory(): Record<string, PromptType[]> {
    const categories: Record<string, PromptType[]> = {};
    
    for (const [promptType, meta] of Object.entries(promptDescriptions)) {
        if (!categories[meta.category]) {
            categories[meta.category] = [];
        }
        categories[meta.category].push(promptType as PromptType);
    }
    
    return categories;
}

/**
 * Obtém personas por foco
 */
export function getPersonasByFocus(focus: PersonaConfig['focus']): PersonaConfig[] {
    return personas.filter(p => p.focus === focus);
}
