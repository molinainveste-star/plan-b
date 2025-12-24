/**
 * Rate Limiting System
 * 
 * Proteção contra abuse em Server Actions.
 * Implementa sliding window rate limiting em memória.
 */

interface RateLimitEntry {
    count: number;
    windowStart: number;
}

interface RateLimitConfig {
    windowMs: number;      // Janela de tempo em ms
    maxRequests: number;   // Máximo de requests na janela
}

// Configurações por action
const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
    'createProfile': {
        windowMs: 60 * 1000,     // 1 minuto
        maxRequests: 3,          // Max 3 perfis por minuto
    },
    'updateYouTubeMetrics': {
        windowMs: 60 * 1000,     // 1 minuto
        maxRequests: 5,          // Max 5 syncs por minuto
    },
    'refineStoryWithAI': {
        windowMs: 60 * 1000,     // 1 minuto
        maxRequests: 10,         // Max 10 gerações por minuto
    },
    'default': {
        windowMs: 60 * 1000,     // 1 minuto
        maxRequests: 30,         // Default: 30 req/min
    },
};

// Storage em memória (reseta no restart do servidor)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpeza periódica de entries antigas
let cleanupInterval: NodeJS.Timeout | null = null;

function startCleanup() {
    if (cleanupInterval) return;
    
    cleanupInterval = setInterval(() => {
        const now = Date.now();
        const maxWindowMs = Math.max(...Object.values(RATE_LIMIT_CONFIGS).map(c => c.windowMs));
        
        for (const [key, entry] of rateLimitStore.entries()) {
            if (now - entry.windowStart > maxWindowMs * 2) {
                rateLimitStore.delete(key);
            }
        }
    }, 60 * 1000); // Limpa a cada 1 minuto
}

/**
 * Extrai identificador do request (IP ou userId)
 */
function getIdentifier(headers?: Headers, userId?: string): string {
    if (userId) return `user:${userId}`;
    
    if (headers) {
        // Tenta pegar IP real (atrás de proxy/Vercel)
        const forwardedFor = headers.get('x-forwarded-for');
        if (forwardedFor) {
            return `ip:${forwardedFor.split(',')[0].trim()}`;
        }
        
        const realIp = headers.get('x-real-ip');
        if (realIp) {
            return `ip:${realIp}`;
        }
    }
    
    return 'ip:unknown';
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetIn: number;        // ms até reset
    limit: number;
}

/**
 * Verifica rate limit para uma action
 * 
 * @param action - Nome da action (ex: 'createProfile')
 * @param identifier - IP ou userId
 * @returns RateLimitResult
 */
export function checkRateLimit(
    action: string,
    identifier: string
): RateLimitResult {
    startCleanup();
    
    const config = RATE_LIMIT_CONFIGS[action] || RATE_LIMIT_CONFIGS['default'];
    const key = `${action}:${identifier}`;
    const now = Date.now();
    
    const entry = rateLimitStore.get(key);
    
    // Primeira request ou janela expirada
    if (!entry || now - entry.windowStart > config.windowMs) {
        rateLimitStore.set(key, { count: 1, windowStart: now });
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs,
            limit: config.maxRequests,
        };
    }
    
    // Dentro da janela
    const remaining = config.maxRequests - entry.count - 1;
    const resetIn = config.windowMs - (now - entry.windowStart);
    
    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn,
            limit: config.maxRequests,
        };
    }
    
    // Incrementa contador
    entry.count++;
    rateLimitStore.set(key, entry);
    
    return {
        allowed: true,
        remaining: Math.max(0, remaining),
        resetIn,
        limit: config.maxRequests,
    };
}

/**
 * Helper para usar em Server Actions
 * 
 * @example
 * ```ts
 * const limit = await rateLimit('createProfile', headers);
 * if (!limit.allowed) {
 *     return { success: false, error: `Rate limit exceeded. Try again in ${Math.ceil(limit.resetIn / 1000)}s` };
 * }
 * ```
 */
export async function rateLimit(
    action: string,
    headers?: Headers,
    userId?: string
): Promise<RateLimitResult> {
    const identifier = getIdentifier(headers, userId);
    return checkRateLimit(action, identifier);
}

/**
 * Reset rate limit para um identifier (útil para testes)
 */
export function resetRateLimit(action: string, identifier: string): void {
    const key = `${action}:${identifier}`;
    rateLimitStore.delete(key);
}

/**
 * Retorna estatísticas do rate limiter
 */
export function getRateLimitStats(): { totalEntries: number; actions: Record<string, number> } {
    const actions: Record<string, number> = {};
    
    for (const key of rateLimitStore.keys()) {
        const action = key.split(':')[0];
        actions[action] = (actions[action] || 0) + 1;
    }
    
    return {
        totalEntries: rateLimitStore.size,
        actions,
    };
}

