/**
 * @deprecated Use '@/lib/supabase/client' para browser ou '@/lib/supabase/server' para server
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** @deprecated Use createServerClient ou createBrowserClient */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
