// =============================================
// Definição dos Planos - Provly
// =============================================

export interface Plan {
    id: string;
    name: string;
    description: string;
    priceMonthly: number; // em reais
    priceYearly: number; // em reais
    maxPlatforms: number;
    maxMediaKits: number;
    features: PlanFeature[];
    stripePriceIdMonthly?: string;
    stripePriceIdYearly?: string;
    isPopular?: boolean;
}

export type PlanFeature = 
    | 'analytics_basic'
    | 'analytics_full'
    | 'pdf_watermark'
    | 'pdf_clean'
    | 'url_generic'
    | 'url_custom'
    | 'api_access'
    | 'white_label'
    | 'priority_support';

export const PLANS: Record<string, Plan> = {
    starter: {
        id: 'starter',
        name: 'Starter',
        description: 'Ideal para começar',
        priceMonthly: 19,
        priceYearly: 190,
        maxPlatforms: 1,
        maxMediaKits: 1,
        features: ['analytics_basic', 'pdf_watermark', 'url_generic'],
        stripePriceIdMonthly: 'price_1Sj2jhJI9mI9qeGAWBj97g34',
        stripePriceIdYearly: 'price_1Sj2jhJI9mI9qeGAw1x78V6S',
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        description: 'Para criadores profissionais',
        priceMonthly: 39,
        priceYearly: 390,
        maxPlatforms: 2,
        maxMediaKits: 3,
        features: ['analytics_full', 'pdf_clean', 'url_custom', 'priority_support'],
        stripePriceIdMonthly: 'price_1Sj2mWJI9mI9qeGArogz1fc9',
        stripePriceIdYearly: 'price_1Sj2mWJI9mI9qeGAppdBQcVe',
        isPopular: true,
    },
    business: {
        id: 'business',
        name: 'Business',
        description: 'Para agências e grandes criadores',
        priceMonthly: 99,
        priceYearly: 990,
        maxPlatforms: 999, // Ilimitado
        maxMediaKits: 999, // Ilimitado
        features: ['analytics_full', 'pdf_clean', 'url_custom', 'api_access', 'white_label', 'priority_support'],
        stripePriceIdMonthly: 'price_1Sj2cZJI9mI9qeGA8Wqo69Ig',
        stripePriceIdYearly: 'price_1Sj2cZJI9mI9qeGAJPfbwjmF',
    },
};

export const TRIAL_DAYS = 5;

export const FEATURE_LABELS: Record<PlanFeature, string> = {
    analytics_basic: 'Analytics básico',
    analytics_full: 'Analytics completo',
    pdf_watermark: 'PDF com marca d\'água',
    pdf_clean: 'PDF sem marca d\'água',
    url_generic: 'URL genérica',
    url_custom: 'URL personalizada',
    api_access: 'Acesso à API',
    white_label: 'White-label',
    priority_support: 'Suporte prioritário',
};

// O que cada plano PERDE em relação ao trial
export const PLAN_LOSSES: Record<string, string[]> = {
    starter: [
        'Apenas 1 plataforma (você conectou mais)',
        'PDF com marca d\'água',
        'URL genérica (provly.com/u/xxx)',
        'Analytics limitado',
    ],
    pro: [
        'Apenas 2 plataformas',
    ],
    business: [],
};

// Helpers
export function getPlan(planId: string): Plan | undefined {
    return PLANS[planId];
}

export function canConnectMorePlatforms(currentCount: number, planId: string): boolean {
    const plan = getPlan(planId);
    if (!plan) return false;
    return currentCount < plan.maxPlatforms;
}

export function canCreateMoreMediaKits(currentCount: number, planId: string): boolean {
    const plan = getPlan(planId);
    if (!plan) return false;
    return currentCount < plan.maxMediaKits;
}

export function hasFeature(planId: string, feature: PlanFeature): boolean {
    const plan = getPlan(planId);
    if (!plan) return false;
    return plan.features.includes(feature);
}

export function getTrialEndDate(startDate: Date = new Date()): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + TRIAL_DAYS);
    return endDate;
}

export function getDaysRemaining(trialEndsAt: Date | string): number {
    const endDate = new Date(trialEndsAt);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

