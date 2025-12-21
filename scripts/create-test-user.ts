
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Using Anon key might be limited by RLS, but let's try. 
// If RLS blocks, I might need SERVICE_ROLE_KEY if available in env.

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
    const slug = 'test_autosave_real';
    console.log(`Creating test user: ${slug}`);

    // Check if exists
    const { data: existing } = await supabase.from('profiles').select('id').eq('username', slug).single();

    if (existing) {
        console.log("User exists, resetting story...");
        const { error } = await supabase.from('profiles').update({
            custom_story: null,
            custom_pitch: null
        }).eq('username', slug);

        if (error) console.error("Error resetting:", error);
        else console.log("Reset complete.");
    } else {
        console.log("Creating new user...");
        const { error } = await supabase.from('profiles').insert([{
            id: crypto.randomUUID(),
            username: slug,
            full_name: 'Test AutoSave',
            bio: 'Bio test',
            niche: 'Tech',
            avatar_url: 'https://github.com/shadcn.png'
        }]);

        if (error) console.error("Error creating:", error);
        else console.log("Creation complete.");
    }
}

createTestUser();
