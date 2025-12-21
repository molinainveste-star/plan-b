-- ============================================
-- PUBLISCORE - Migration 001: Initial Schema
-- ============================================
-- Cria as tabelas base: profiles, metrics, social_accounts
-- ============================================

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    
    -- Identidade
    username text UNIQUE NOT NULL,
    full_name text,
    email text,
    avatar_url text,
    
    -- Perfil
    bio text,
    location text,
    niche text DEFAULT 'Geral',
    website text,
    
    -- YouTube
    youtube_channel_id text,
    
    -- AI Generated Content
    custom_story text,
    custom_pitch text,
    
    -- Constraints
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "profiles_select_public" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "profiles_insert_public" ON public.profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "profiles_update_public" ON public.profiles
    FOR UPDATE USING (true);

-- ============================================
-- METRICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.metrics (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    label text NOT NULL,
    value text NOT NULL,
    trend text,
    trend_direction text CHECK (trend_direction IN ('up', 'down', 'neutral')),
    icon text,
    
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "metrics_select_public" ON public.metrics
    FOR SELECT USING (true);

CREATE POLICY "metrics_insert_public" ON public.metrics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "metrics_update_public" ON public.metrics
    FOR UPDATE USING (true);

CREATE POLICY "metrics_delete_public" ON public.metrics
    FOR DELETE USING (true);

-- ============================================
-- SOCIAL ACCOUNTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.social_accounts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    platform text NOT NULL,
    handle text NOT NULL,
    url text,
    
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "social_accounts_select_public" ON public.social_accounts
    FOR SELECT USING (true);

CREATE POLICY "social_accounts_insert_public" ON public.social_accounts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "social_accounts_update_public" ON public.social_accounts
    FOR UPDATE USING (true);

CREATE POLICY "social_accounts_delete_public" ON public.social_accounts
    FOR DELETE USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_metrics_profile_id ON public.metrics(profile_id);
CREATE INDEX IF NOT EXISTS idx_social_accounts_profile_id ON public.social_accounts(profile_id);

