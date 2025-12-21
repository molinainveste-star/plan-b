import { supabase } from "@/lib/supabase";

export async function getProfileBySlug(slug: string) {
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

    // If not found, try lowercase slug (robustness for case sensitivity)
    if (error && error.code === 'PGRST116' && slug !== slug.toLowerCase()) {
        console.log(`⚠️ Profile not found for '${slug}', trying '${slug.toLowerCase()}'...`);
        const { data: retryData, error: retryError } = await supabase
            .from("profiles")
            .select(`
                *,
                metrics (*),
                social_accounts (*),
                video_performance (*)
            `)
            .eq("username", slug.toLowerCase())
            .single();

        if (!retryError && retryData) {
            return retryData;
        }
    }

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
