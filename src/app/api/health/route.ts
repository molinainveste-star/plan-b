/**
 * Health Check Endpoint
 * 
 * Verifica status de todas as dependências críticas.
 * Útil para monitoramento e alertas.
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin, isAdminAvailable } from '@/lib/supabase/admin';

interface HealthCheck {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    version: string;
    uptime: number;
    checks: {
        supabase: CheckResult;
        youtube_api: CheckResult;
        gemini_api: CheckResult;
        environment: CheckResult;
    };
}

interface CheckResult {
    status: 'ok' | 'warning' | 'error';
    latency?: number;
    message?: string;
}

const startTime = Date.now();
const TIMEOUT_MS = 5000;

// Helper para timeout robusto
async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
    const timeout = new Promise<T>((resolve) => {
        setTimeout(() => resolve(fallback), ms);
    });
    return Promise.race([promise, timeout]);
}

async function checkSupabase(): Promise<CheckResult> {
    const start = Date.now();
    
    try {
        if (!isAdminAvailable()) {
            return { status: 'error', message: 'Service role key missing' };
        }
        
        const result = await withTimeout(
            supabaseAdmin.from('profiles').select('id').limit(1),
            TIMEOUT_MS,
            { error: { message: 'Timeout' } }
        );
        
        const latency = Date.now() - start;
        
        if (result.error) {
            return { status: 'error', latency, message: result.error.message };
        }
        
        return { status: latency > 1000 ? 'warning' : 'ok', latency };
    } catch (err) {
        return { 
            status: 'error', 
            latency: Date.now() - start,
            message: err instanceof Error ? err.message : 'Unknown error' 
        };
    }
}

async function checkYouTubeAPI(): Promise<CheckResult> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
        return { status: 'error', message: 'API key missing' };
    }
    
    const start = Date.now();
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
        
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=id&id=dQw4w9WgXcQ&key=${apiKey}`,
            { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        const latency = Date.now() - start;
        
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            const errorMessage = data.error?.message || `HTTP ${response.status}`;
            
            if (response.status === 403 && errorMessage.includes('quota')) {
                return { status: 'warning', latency, message: 'Quota exceeded' };
            }
            
            return { status: 'error', latency, message: errorMessage };
        }
        
        return { status: latency > 2000 ? 'warning' : 'ok', latency };
    } catch (err) {
        const latency = Date.now() - start;
        const message = err instanceof Error ? err.message : 'Unknown error';
        
        if (message.includes('aborted')) {
            return { status: 'error', latency, message: 'Timeout' };
        }
        
        return { status: 'error', latency, message };
    }
}

async function checkGeminiAPI(): Promise<CheckResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return { status: 'warning', message: 'API key missing (AI disabled)' };
    }
    
    const start = Date.now();
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
            { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        const latency = Date.now() - start;
        
        if (!response.ok) {
            return { status: 'error', latency, message: `HTTP ${response.status}` };
        }
        
        return { status: latency > 2000 ? 'warning' : 'ok', latency };
    } catch (err) {
        const latency = Date.now() - start;
        const message = err instanceof Error ? err.message : 'Unknown error';
        
        if (message.includes('aborted')) {
            return { status: 'error', latency, message: 'Timeout' };
        }
        
        return { status: 'error', latency, message };
    }
}

function checkEnvironment(): CheckResult {
    const requiredVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'SUPABASE_SERVICE_ROLE_KEY',
        'YOUTUBE_API_KEY',
    ];
    
    const optionalVars = ['GEMINI_API_KEY'];
    
    const missing = requiredVars.filter(v => !process.env[v]);
    const missingOptional = optionalVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
        return { status: 'error', message: `Missing required: ${missing.join(', ')}` };
    }
    
    if (missingOptional.length > 0) {
        return { status: 'warning', message: `Missing optional: ${missingOptional.join(', ')}` };
    }
    
    return { status: 'ok' };
}

export async function GET() {
    const [supabase, youtube, gemini] = await Promise.all([
        checkSupabase(),
        checkYouTubeAPI(),
        checkGeminiAPI(),
    ]);
    
    const environment = checkEnvironment();
    const checks = { supabase, youtube_api: youtube, gemini_api: gemini, environment };
    
    const allChecks = Object.values(checks);
    const hasError = allChecks.some(c => c.status === 'error');
    const hasWarning = allChecks.some(c => c.status === 'warning');
    
    let overallStatus: HealthCheck['status'] = 'healthy';
    if (hasError) overallStatus = 'unhealthy';
    else if (hasWarning) overallStatus = 'degraded';
    
    const health: HealthCheck = {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '0.1.0',
        uptime: Math.floor((Date.now() - startTime) / 1000),
        checks,
    };
    
    return NextResponse.json(health, { status: overallStatus === 'unhealthy' ? 503 : 200 });
}
