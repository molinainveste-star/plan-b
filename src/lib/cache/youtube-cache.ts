/**
 * YouTube Cache System
 * 
 * Cache local para dados do YouTube com fallback quando quota excedida.
 * Usa Supabase como storage para persistência entre restarts.
 */

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { YouTubeChannelData, YouTubeVideoData } from "@/lib/youtube/types";

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 horas
const MEMORY_CACHE = new Map<string, { data: unknown; timestamp: number }>();

interface CachedYouTubeData {
    channel: YouTubeChannelData;
    videos: YouTubeVideoData[];
    cachedAt: string;
}

/**
 * Normaliza input do YouTube para usar como cache key
 */
function normalizeKey(input: string): string {
    return input
        .toLowerCase()
        .replace(/https?:\/\/(www\.)?youtube\.com\/?/, '')
        .replace(/\//g, '_')
        .replace(/@/g, '')
        .trim();
}

/**
 * Busca dados do cache em memória (mais rápido)
 */
function getFromMemoryCache<T>(key: string): T | null {
    const cached = MEMORY_CACHE.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > CACHE_TTL_MS;
    if (isExpired) {
        MEMORY_CACHE.delete(key);
        return null;
    }

    return cached.data as T;
}

/**
 * Salva no cache em memória
 */
function setMemoryCache(key: string, data: unknown): void {
    MEMORY_CACHE.set(key, { data, timestamp: Date.now() });

    // Limita tamanho do cache em memória (max 100 entries)
    if (MEMORY_CACHE.size > 100) {
        const firstKey = MEMORY_CACHE.keys().next().value;
        if (firstKey) MEMORY_CACHE.delete(firstKey);
    }
}

/**
 * Busca dados do YouTube do cache (Supabase)
 */
export async function getCachedYouTubeData(
    input: string
): Promise<CachedYouTubeData | null> {
    const cacheKey = normalizeKey(input);

    // 1. Tenta cache em memória primeiro
    const memCached = getFromMemoryCache<CachedYouTubeData>(`yt:${cacheKey}`);
    if (memCached) {
        console.log(`📦 YouTube Cache HIT (memory): ${cacheKey}`);
        return memCached;
    }

    // 2. Fallback para Supabase
    try {
        const { data, error } = await supabaseAdmin
            .from("youtube_cache")
            .select("*")
            .eq("cache_key", cacheKey)
            .single();

        if (error || !data) {
            console.log(`📦 YouTube Cache MISS: ${cacheKey}`);
            return null;
        }

        // Verifica expiração
        const cachedAt = new Date(data.cached_at).getTime();
        const isExpired = Date.now() - cachedAt > CACHE_TTL_MS;

        if (isExpired) {
            console.log(`📦 YouTube Cache EXPIRED: ${cacheKey}`);
            return null;
        }

        const result: CachedYouTubeData = {
            channel: data.channel_data,
            videos: data.videos_data || [],
            cachedAt: data.cached_at,
        };

        // Atualiza cache em memória
        setMemoryCache(`yt:${cacheKey}`, result);

        console.log(`📦 YouTube Cache HIT (db): ${cacheKey}`);
        return result;
    } catch (err) {
        console.error("❌ Error reading YouTube cache:", err);
        return null;
    }
}

/**
 * Salva dados do YouTube no cache
 */
export async function cacheYouTubeData(
    input: string,
    channel: YouTubeChannelData,
    videos: YouTubeVideoData[]
): Promise<void> {
    const cacheKey = normalizeKey(input);
    const now = new Date().toISOString();

    const cacheData: CachedYouTubeData = {
        channel,
        videos,
        cachedAt: now,
    };

    // 1. Salva em memória (imediato)
    setMemoryCache(`yt:${cacheKey}`, cacheData);

    // 2. Persiste no Supabase (background)
    try {
        await supabaseAdmin
            .from("youtube_cache")
            .upsert({
                cache_key: cacheKey,
                channel_id: channel.id,
                channel_data: channel,
                videos_data: videos,
                cached_at: now,
            }, { onConflict: "cache_key" });

        console.log(`💾 YouTube Cache SAVED: ${cacheKey}`);
    } catch (err) {
        console.error("❌ Error saving YouTube cache:", err);
        // Não throw - cache é best-effort
    }
}

/**
 * Limpa cache expirado (rodar periodicamente)
 */
export async function cleanExpiredCache(): Promise<number> {
    const expirationDate = new Date(Date.now() - CACHE_TTL_MS).toISOString();

    try {
        const { count } = await supabaseAdmin
            .from("youtube_cache")
            .delete()
            .lt("cached_at", expirationDate);

        console.log(`🧹 Cleaned ${count || 0} expired cache entries`);
        return count || 0;
    } catch (err) {
        console.error("❌ Error cleaning cache:", err);
        return 0;
    }
}

/**
 * Verifica se temos cache válido para um input
 */
export async function hasCacheFor(input: string): Promise<boolean> {
    const cached = await getCachedYouTubeData(input);
    return cached !== null;
}



