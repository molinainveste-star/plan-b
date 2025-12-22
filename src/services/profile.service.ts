"use server";

import { createClient as createServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
    createProfileSchema,
    updateProfileStorySchema,
    updateProfileAvatarSchema,
    updatePricingPackagesSchema,
    updateCaseStudiesSchema,
    validateInput,
} from "@/lib/validators/schemas";
import { syncYouTubeMetrics } from "./youtube.service";

export interface CreateProfileData {
    name: string;
    email: string;
    slug: string;
    youtubeChannelId?: string;
}

/**
 * Cria um novo perfil de criador
 */
export async function createProfile(data: CreateProfileData) {
    // ✅ VALIDATION
    const validation = validateInput(createProfileSchema, data);
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    console.log(`🚀 Creating profile for: ${validData.slug}...`);

    const supabase = await createServerClient();

    // Check if slug is taken
    const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", validData.slug)
        .single();

    if (existingUser) {
        return { success: false, error: "Slug already taken. Please choose another." };
    }

    // ✅ REQUIRE AUTHENTICATION
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, error: "Você precisa estar logado para criar um perfil" };
    }
    const userId = user.id;

    const { error } = await supabase
        .from("profiles")
        .insert([{
            id: userId,
            username: validData.slug,
            full_name: validData.name,
            bio: "",
            niche: "Geral",
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${validData.slug}`,
            youtube_channel_id: validData.youtubeChannelId || null,
        }])
        .select()
        .single();

    if (error) {
        console.error("Error creating profile:", error);
        return { success: false, error: error.message };
    }

    // If YouTube ID is provided, fetch metrics immediately
    if (validData.youtubeChannelId) {
        console.log(`🔗 YouTube ID provided, starting fetch...`);
        await syncYouTubeMetrics(validData.slug, validData.youtubeChannelId);
    }

    return { success: true, slug: validData.slug };
}

/**
 * Atualiza história e pitch do perfil
 */
export async function updateProfileStory(slug: string, story: string, pitch: string) {
    // ✅ VALIDATION
    const validation = validateInput(updateProfileStorySchema, { slug, story, pitch });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    const supabase = await createServerClient();

    const { error } = await supabase
        .from("profiles")
        .update({
            custom_story: validData.story,
            custom_pitch: validData.pitch,
            updated_at: new Date().toISOString()
        })
        .eq("username", validData.slug);

    if (error) {
        console.error("❌ Error updating profile story:", error);
        throw error;
    }

    return { success: true };
}

/**
 * Atualiza avatar do perfil
 */
export async function updateProfileAvatar(slug: string, avatarUrl: string) {
    // ✅ VALIDATION
    const validation = validateInput(updateProfileAvatarSchema, { slug, avatarUrl });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    const { error } = await supabaseAdmin
        .from("profiles")
        .update({ avatar_url: validData.avatarUrl })
        .eq("username", validData.slug);

    if (error) {
        console.error("Error updating avatar:", error);
        throw error;
    }
    return { success: true };
}

/**
 * Atualiza pacotes de precificação
 */
export async function updatePricingPackages(slug: string, packages: unknown[]) {
    // ✅ VALIDATION
    const validation = validateInput(updatePricingPackagesSchema, { slug, packages });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    try {
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                pricing_packages: validData.packages,
                updated_at: new Date().toISOString()
            })
            .eq("username", validData.slug);

        if (error) {
            console.error("❌ Error updating pricing packages:", error);
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("❌ Unexpected error updating pricing:", error);
        return { success: false, error: String(error) };
    }
}

/**
 * Atualiza cases de marca
 */
export async function updateProfileCaseStudies(slug: string, cases: unknown[]) {
    // ✅ VALIDATION
    const validation = validateInput(updateCaseStudiesSchema, { slug, cases });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    try {
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                brand_cases: validData.cases,
                updated_at: new Date().toISOString()
            })
            .eq("username", validData.slug);

        if (error) {
            console.error("❌ Error updating case studies:", error);
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("❌ Unexpected error updating case studies:", error);
        return { success: false, error: String(error) };
    }
}

