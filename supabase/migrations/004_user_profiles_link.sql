-- =============================================
-- Migration: Link auth.users with profiles
-- =============================================

-- 1. Add user_id column to profiles (links to Supabase Auth)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Create unique index for user_id (one profile per user)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_user_id_unique_idx ON public.profiles(user_id) WHERE user_id IS NOT NULL;

-- 3. Create social_tokens table for OAuth tokens
CREATE TABLE IF NOT EXISTS public.social_tokens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    provider text NOT NULL, -- 'youtube', 'tiktok', 'instagram', 'twitter'
    access_token text,
    refresh_token text,
    expires_at timestamptz,
    provider_user_id text, -- ID do usuário na plataforma (ex: TikTok open_id)
    provider_username text, -- Username na plataforma
    scopes text[], -- Scopes autorizados
    raw_data jsonb DEFAULT '{}', -- Dados extras do provider
    created_at timestamptz DEFAULT timezone('utc'::text, now()),
    updated_at timestamptz DEFAULT timezone('utc'::text, now()),
    
    -- Unique constraint: one token per provider per profile
    CONSTRAINT social_tokens_profile_provider_unique UNIQUE (profile_id, provider)
);

-- 4. Enable RLS on social_tokens
ALTER TABLE public.social_tokens ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for social_tokens
-- Users can only see their own tokens
CREATE POLICY "Users can view own social tokens" 
ON public.social_tokens FOR SELECT 
USING (
    profile_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
);

-- Users can insert tokens for their own profile
CREATE POLICY "Users can insert own social tokens" 
ON public.social_tokens FOR INSERT 
WITH CHECK (
    profile_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
);

-- Users can update their own tokens
CREATE POLICY "Users can update own social tokens" 
ON public.social_tokens FOR UPDATE 
USING (
    profile_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
);

-- Users can delete their own tokens
CREATE POLICY "Users can delete own social tokens" 
ON public.social_tokens FOR DELETE 
USING (
    profile_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
);

-- 6. Update profiles RLS to allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (user_id = auth.uid());

-- 7. Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name, username)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        LOWER(REPLACE(COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), ' ', ''))
    )
    ON CONFLICT (username) DO UPDATE SET
        user_id = EXCLUDED.user_id,
        email = EXCLUDED.email;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Create updated_at trigger for social_tokens
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER social_tokens_updated_at
    BEFORE UPDATE ON public.social_tokens
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

