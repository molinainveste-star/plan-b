import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log("🔍 DIAGNOSTIC: Checking for profiles...");

    // Check specific slug
    const { data: exact, error: exactErr } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('username', 'RCariani')
        .single();

    const { data: lower, error: lowerErr } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('username', 'rcariani')
        .single();

    // Check total count
    const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

    return NextResponse.json({
        total_profiles: count,
        check_RCariani: { found: !!exact, data: exact, error: exactErr },
        check_rcariani: { found: !!lower, data: lower, error: lowerErr }
    });
}
