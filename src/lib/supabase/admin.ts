import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente Admin Supabase (Service Role)
 * ⚠️ CUIDADO: Bypassa RLS completamente
 * Use APENAS para operações administrativas específicas
 */
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
    if (!_supabaseAdmin) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        
        if (!supabaseUrl || !supabaseServiceRoleKey) {
            throw new Error('Supabase admin não configurado: faltam NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY');
        }
        
        _supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: { autoRefreshToken: false, persistSession: false }
        });
    }
    return _supabaseAdmin;
}

// Proxy para lazy initialization - só inicializa quando usado
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        return getSupabaseAdmin()[prop as keyof SupabaseClient];
    }
});

/**
 * Verifica se o admin client está disponível
 */
export function isAdminAvailable(): boolean {
    return !!supabaseServiceRoleKey;
}

