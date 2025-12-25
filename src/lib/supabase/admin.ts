import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Só mostra warning em runtime, não durante build
if (typeof window === 'undefined' && !supabaseServiceRoleKey && process.env.NODE_ENV !== 'production') {
    console.warn("⚠️ SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations will fail.");
}

/**
 * Cliente Admin Supabase (Service Role)
 * ⚠️ CUIDADO: Bypassa RLS completamente
 * Use APENAS para operações administrativas específicas
 */
let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
    if (!_supabaseAdmin) {
        if (!supabaseUrl) {
            // Durante build, retorna um cliente dummy que não será usado
            return createClient('https://placeholder.supabase.co', 'placeholder-key', {
                auth: { autoRefreshToken: false, persistSession: false }
            });
        }
        _supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: { autoRefreshToken: false, persistSession: false }
        });
    }
    return _supabaseAdmin;
}

export const supabaseAdmin = getSupabaseAdmin();

/**
 * Verifica se o admin client está disponível
 */
export function isAdminAvailable(): boolean {
    return !!supabaseServiceRoleKey;
}

