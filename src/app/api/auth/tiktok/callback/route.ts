import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // profile_id
    const error = searchParams.get("error");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

    // Handle OAuth errors
    if (error) {
        console.error("TikTok OAuth error:", error);
        return NextResponse.redirect(
            `${baseUrl}/dashboard/social?error=${encodeURIComponent(error)}`
        );
    }

    if (!code || !state) {
        return NextResponse.redirect(
            `${baseUrl}/dashboard/social?error=missing_params`
        );
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_key: TIKTOK_CLIENT_KEY!,
                client_secret: TIKTOK_CLIENT_SECRET!,
                code,
                grant_type: "authorization_code",
                redirect_uri: `${baseUrl}/api/auth/tiktok/callback`,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            console.error("TikTok token error:", tokenData);
            return NextResponse.redirect(
                `${baseUrl}/dashboard/social?error=${encodeURIComponent(tokenData.error.message || tokenData.error)}`
            );
        }

        const { access_token, refresh_token, expires_in, open_id, scope } = tokenData;

        // Get user info from TikTok
        const userResponse = await fetch(
            "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,username,follower_count,following_count,likes_count,video_count",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        const userData = await userResponse.json();
        const userInfo = userData.data?.user || {};

        // Save to database
        const supabase = await createClient();

        // Verify profile exists
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("id, user_id")
            .eq("id", state)
            .single();

        if (profileError || !profile) {
            console.error("Profile not found:", state);
            return NextResponse.redirect(
                `${baseUrl}/dashboard/social?error=profile_not_found`
            );
        }

        // Upsert social token
        const { error: upsertError } = await supabase
            .from("social_tokens")
            .upsert({
                profile_id: state,
                provider: "tiktok",
                access_token,
                refresh_token,
                expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
                provider_user_id: open_id,
                provider_username: userInfo.username || userInfo.display_name,
                scopes: scope?.split(",") || [],
                raw_data: {
                    ...userInfo,
                    fetched_at: new Date().toISOString(),
                },
            }, {
                onConflict: "profile_id,provider",
            });

        if (upsertError) {
            console.error("Error saving TikTok token:", upsertError);
            return NextResponse.redirect(
                `${baseUrl}/dashboard/social?error=save_failed`
            );
        }

        // Success!
        return NextResponse.redirect(`${baseUrl}/dashboard/social?success=tiktok`);

    } catch (err) {
        console.error("TikTok callback error:", err);
        return NextResponse.redirect(
            `${baseUrl}/dashboard/social?error=callback_failed`
        );
    }
}

