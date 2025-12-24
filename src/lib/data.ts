import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getProfileBySlug(slug: string) {
    // Usa admin client para bypass de RLS (dados são públicos de qualquer forma)
    // Busca case-insensitive usando ilike
    const { data, error } = await supabaseAdmin
        .from("profiles")
        .select(`
            *,
            metrics (*),
            social_accounts (*),
            video_performance (*)
        `)
        .ilike("username", slug)
        .single();

    if (error) {
        // Ignore "Row not found" error when using .single()
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error("❌ Error fetching profile:", error.code, error.message);
        return null;
    }

    return data;
}
