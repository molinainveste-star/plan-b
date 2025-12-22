import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
    console.warn("⚠️ SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations will fail.");
}

/**
 * Cliente Admin Supabase (Service Role)
 * ⚠️ CUIDADO: Bypassa RLS completamente
 * Use APENAS para operações administrativas específicas
 */
export const supabaseAdmin = createClient(
    supabaseUrl,
    supabaseServiceRoleKey || '',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

/**
 * Verifica se o admin client está disponível
 */
export function isAdminAvailable(): boolean {
    return !!supabaseServiceRoleKey;
}

