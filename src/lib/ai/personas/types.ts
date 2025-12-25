/**
 * Sistema de Personas para IA do Provly
 * 
 * Cada persona é especializada em um aspecto do processo de
 * criação de Media Kits e estratégia para criadores de conteúdo.
 */

export type PersonaId = 
    | 'estrategista-pr'
    | 'head-partnerships'
    | 'cmo-global'
    | 'analista-dados'
    | 'copywriter'
    | 'copywriter-elite'
    | 'guardiao-juridico';

export type PersonaTone = 
    | 'professional'      // Corporativo, B2B
    | 'strategic'         // Visionário, big-picture
    | 'analytical'        // Data-driven, preciso
    | 'persuasive'        // Conversão, copy
    | 'creative'          // Inovador, disruptivo
    | 'cautious';         // Jurídico, compliance, proteção

export type PersonaFocus = 
    | 'branding'          // Posicionamento e imagem
    | 'partnerships'      // Parcerias e deals
    | 'growth'            // Escala e aquisição
    | 'metrics'           // Dados e insights
    | 'conversion'        // Copy e vendas
    | 'compliance';       // Legal, LGPD, GDPR, contratos

/**
 * Configuração base de uma Persona
 */
export interface PersonaConfig {
    id: PersonaId;
    name: string;
    title: string;
    description: string;
    tone: PersonaTone;
    focus: PersonaFocus;
    
    /** Expertise específicas da persona */
    expertise: string[];
    
    /** Frases/termos que a persona usa naturalmente */
    vocabulary: string[];
    
    /** O que a persona EVITA fazer */
    avoids: string[];
    
    /** Métricas de sucesso para a persona */
    kpis: string[];
}

/**
 * Contexto passado para geração de prompts
 */
export interface PersonaContext {
    /** Dados do criador */
    creator?: {
        name?: string;
        bio?: string;
        niche?: string;
        channelId?: string;
    };
    
    /** Métricas do canal */
    metrics?: Array<{ 
        label: string; 
        value: string | number;
        trend?: 'up' | 'down' | 'stable';
    }>;
    
    /** Vídeos recentes */
    videos?: Array<{ 
        title: string; 
        views: number; 
        likes?: number;
        comments?: number;
        published_at: string;
        thumbnail?: string;
    }>;
    
    /** Dados demográficos da audiência */
    demographics?: {
        ageGroups?: Record<string, number>;
        genderSplit?: { male: number; female: number; other: number };
        topCountries?: Array<{ country: string; percentage: number }>;
    };
    
    /** Contexto adicional */
    extra?: Record<string, unknown>;
}

/**
 * Resultado estruturado de uma geração de persona
 */
export interface PersonaOutput<T = unknown> {
    personaId: PersonaId;
    generatedAt: Date;
    model: string;
    data: T;
    confidence?: number;
}

/**
 * Output específico: Story + Pitch
 */
export interface StoryPitchOutput {
    story: string;
    pitch: string;
}

/**
 * Output específico: Análise de Nicho
 */
export interface NicheAnalysisOutput {
    primaryNiche: string;
    secondaryNiche?: string;
    confidence: number;
    reasoning: string;
}

/**
 * Output específico: Estratégia de Crescimento (CMO)
 */
export interface GrowthStrategyOutput {
    marketPosition: string;
    competitiveAdvantage: string;
    expansionStrategy: {
        brazil: string[];
        international: string[];
    };
    partnershipOpportunities: string[];
    pricingStrategy: string;
}

/**
 * Output específico: Insights de Dados
 */
export interface DataInsightsOutput {
    performanceSummary: string;
    topPerformingContent: string[];
    audienceInsights: string;
    growthProjection: string;
    recommendations: string[];
}

/**
 * Output específico: Copy de Conversão
 */
export interface ConversionCopyOutput {
    headline: string;
    subheadline: string;
    bulletPoints: string[];
    callToAction: string;
    socialProof: string;
}

/**
 * Output específico: Auditoria de Compliance (Guardião Jurídico)
 */
export interface ComplianceAuditOutput {
    overallStatus: 'compliant' | 'partially_compliant' | 'non_compliant';
    lgpdCompliance: {
        status: 'ok' | 'warning' | 'critical';
        findings: string[];
        recommendations: string[];
    };
    gdprCompliance: {
        status: 'ok' | 'warning' | 'critical';
        findings: string[];
        recommendations: string[];
    };
    termsOfService: {
        status: 'ok' | 'needs_update' | 'missing';
        issues: string[];
    };
    privacyPolicy: {
        status: 'ok' | 'needs_update' | 'missing';
        issues: string[];
    };
    dataRetention: {
        documented: boolean;
        compliant: boolean;
        notes: string;
    };
    readinessScore: number; // 0-100
    criticalActions: string[];
    dueDiligenceNotes: string;
}

/**
 * Output específico: Análise de Contratos
 */
export interface ContractAnalysisOutput {
    contractType: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    keyTerms: string[];
    redFlags: string[];
    missingClauses: string[];
    recommendations: string[];
    negotiationPoints: string[];
}

/**
 * Output específico: Mapeamento de Dados Pessoais (ROPA)
 */
export interface DataMappingOutput {
    dataCategories: Array<{
        category: string;
        dataTypes: string[];
        legalBasis: string;
        retentionPeriod: string;
        thirdPartySharing: boolean;
    }>;
    sensitiveData: boolean;
    internationalTransfers: boolean;
    processingActivities: string[];
    consentMechanisms: string[];
    dataSubjectRights: string[];
}
