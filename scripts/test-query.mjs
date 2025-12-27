import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const slug = process.argv[2] || 'renatocariani';

async function testQuery() {
    console.log(`\n🔍 Testando query para: ${slug}\n`);
    
    // Query EXATA que o Next.js faz
    const { data, error } = await supabase
        .from("profiles")
        .select(`
            *,
            metrics (*),
            social_accounts (*),
            video_performance (*)
        `)
        .eq("username", slug)
        .single();
    
    if (error) {
        console.log('❌ ERRO:', error.code, error.message);
        return;
    }
    
    console.log('✅ Profile encontrado:', data.full_name || data.username);
    console.log('📊 Metrics:', data.metrics?.length || 0);
    console.log('🔗 Social accounts:', data.social_accounts?.length || 0);
    console.log('🎬 Video performance:', data.video_performance?.length || 0);
    
    if (data.video_performance?.length > 0) {
        console.log('\nPrimeiros 3 vídeos:');
        data.video_performance.slice(0, 3).forEach(v => {
            console.log(`  - ${v.title?.substring(0, 60)}...`);
            console.log(`    views: ${v.view_count}, likes: ${v.like_count}`);
        });
    } else {
        console.log('\n⚠️ NENHUM VÍDEO RETORNADO NA QUERY!');
    }
}

testQuery();




