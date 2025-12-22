-- ============================================
-- PUBLISCORE - Migration 002: Secure RLS Policies
-- ============================================
-- Corrige as políticas RLS para segurança adequada:
-- - SELECT público (Media Kits são públicos)
-- - INSERT/UPDATE/DELETE apenas para owner
-- ============================================

-- ============================================
-- PROFILES TABLE - Corrigir Policies
-- ============================================

-- Remover políticas antigas permissivas
DROP POLICY IF EXISTS "profiles_insert_public" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_public" ON public.profiles;

-- Nova policy: Apenas usuário autenticado pode criar seu próprio perfil
CREATE POLICY "profiles_insert_own" ON public.profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Nova policy: Apenas owner pode editar
CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Nova policy: Apenas owner pode deletar
CREATE POLICY "profiles_delete_own" ON public.profiles
    FOR DELETE 
    USING (auth.uid() = id);

-- ============================================
-- METRICS TABLE - Corrigir Policies
-- ============================================

-- Remover políticas antigas permissivas
DROP POLICY IF EXISTS "metrics_insert_public" ON public.metrics;
DROP POLICY IF EXISTS "metrics_update_public" ON public.metrics;
DROP POLICY IF EXISTS "metrics_delete_public" ON public.metrics;

-- Nova policy: Apenas owner do profile pode inserir métricas
CREATE POLICY "metrics_insert_own" ON public.metrics
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = metrics.profile_id 
            AND profiles.id = auth.uid()
        )
    );

-- Nova policy: Apenas owner pode editar
CREATE POLICY "metrics_update_own" ON public.metrics
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = metrics.profile_id 
            AND profiles.id = auth.uid()
        )
    );

-- Nova policy: Apenas owner pode deletar
CREATE POLICY "metrics_delete_own" ON public.metrics
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = metrics.profile_id 
            AND profiles.id = auth.uid()
        )
    );

-- ============================================
-- SOCIAL ACCOUNTS TABLE - Corrigir Policies
-- ============================================

-- Remover políticas antigas permissivas
DROP POLICY IF EXISTS "social_accounts_insert_public" ON public.social_accounts;
DROP POLICY IF EXISTS "social_accounts_update_public" ON public.social_accounts;
DROP POLICY IF EXISTS "social_accounts_delete_public" ON public.social_accounts;

-- Nova policy: Apenas owner do profile pode inserir
CREATE POLICY "social_accounts_insert_own" ON public.social_accounts
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = social_accounts.profile_id 
            AND profiles.id = auth.uid()
        )
    );

-- Nova policy: Apenas owner pode editar
CREATE POLICY "social_accounts_update_own" ON public.social_accounts
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = social_accounts.profile_id 
            AND profiles.id = auth.uid()
        )
    );

-- Nova policy: Apenas owner pode deletar
CREATE POLICY "social_accounts_delete_own" ON public.social_accounts
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = social_accounts.profile_id 
            AND profiles.id = auth.uid()
        )
    );

-- ============================================
-- VIDEO_PERFORMANCE TABLE (se existir)
-- ============================================
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'video_performance') THEN
        -- Remover políticas antigas
        DROP POLICY IF EXISTS "video_performance_insert_public" ON public.video_performance;
        DROP POLICY IF EXISTS "video_performance_update_public" ON public.video_performance;
        DROP POLICY IF EXISTS "video_performance_delete_public" ON public.video_performance;
        
        -- Criar novas políticas seguras
        CREATE POLICY "video_performance_insert_own" ON public.video_performance
            FOR INSERT 
            WITH CHECK (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE profiles.id = video_performance.profile_id 
                    AND profiles.id = auth.uid()
                )
            );
        
        CREATE POLICY "video_performance_update_own" ON public.video_performance
            FOR UPDATE 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE profiles.id = video_performance.profile_id 
                    AND profiles.id = auth.uid()
                )
            );
        
        CREATE POLICY "video_performance_delete_own" ON public.video_performance
            FOR DELETE 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE profiles.id = video_performance.profile_id 
                    AND profiles.id = auth.uid()
                )
            );
    END IF;
END $$;

-- ============================================
-- NOTA: Service Role Key (Admin Client)
-- ============================================
-- O supabaseAdmin usa a Service Role Key que BYPASSA o RLS
-- Isso é intencional para operações de sistema como:
-- - Sync de métricas do YouTube
-- - Geração automática de conteúdo AI
-- 
-- O client normal (anon key) respeita RLS
-- Usuários só podem modificar seus próprios dados
-- ============================================

