import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function debug() {
    const { data: profiles } = await supabase
        .from('profiles')
        .select('username, id');
    
    console.log('\n📊 PERFIS E VÍDEOS NO BANCO:\n');
    
    for (const p of profiles || []) {
        const { data: videos } = await supabase
            .from('video_performance')
            .select('video_id, title')
            .eq('profile_id', p.id);
        
        const count = videos?.length || 0;
        const status = count > 0 ? '✅' : '❌';
        console.log(`${status} ${p.username}: ${count} vídeos`);
        
        if (count > 0 && count <= 3) {
            videos.forEach(v => console.log(`   - ${v.title?.substring(0, 50)}...`));
        }
    }
}

debug();

