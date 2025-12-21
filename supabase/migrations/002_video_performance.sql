-- ============================================
-- PUBLISCORE - Migration 002: Video Performance
-- ============================================
-- Tabela para armazenar performance dos vídeos do YouTube
-- ============================================

CREATE TABLE IF NOT EXISTS public.video_performance (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- YouTube Video Data
    video_id text NOT NULL,
    title text NOT NULL,
    view_count bigint NOT NULL DEFAULT 0,
    like_count bigint DEFAULT 0,
    comment_count bigint DEFAULT 0,
    
    -- Timestamps
    published_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.video_performance ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "video_performance_select_public" ON public.video_performance
    FOR SELECT USING (true);

CREATE POLICY "video_performance_insert_public" ON public.video_performance
    FOR INSERT WITH CHECK (true);

CREATE POLICY "video_performance_delete_public" ON public.video_performance
    FOR DELETE USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_video_performance_profile_id ON public.video_performance(profile_id);
CREATE INDEX IF NOT EXISTS idx_video_performance_published_at ON public.video_performance(published_at DESC);

