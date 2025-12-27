-- ============================================
-- PUBLISCORE - Migration 004: Risk Management
-- ============================================
-- Adiciona tabelas para:
-- - Cache de dados do YouTube
-- - Logs de erros estruturados
-- ============================================

-- ============================================
-- YOUTUBE_CACHE TABLE
-- ============================================
-- Cache local para dados do YouTube
-- Usado como fallback quando quota excedida

CREATE TABLE IF NOT EXISTS public.youtube_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cache_key TEXT UNIQUE NOT NULL,
    channel_id TEXT NOT NULL,
    channel_data JSONB NOT NULL,
    videos_data JSONB DEFAULT '[]'::jsonb,
    cached_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_youtube_cache_key ON public.youtube_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_youtube_cache_channel_id ON public.youtube_cache(channel_id);
CREATE INDEX IF NOT EXISTS idx_youtube_cache_cached_at ON public.youtube_cache(cached_at);

-- RLS: Cache é gerenciado pelo sistema (service role)
ALTER TABLE public.youtube_cache ENABLE ROW LEVEL SECURITY;

-- Política: Apenas leitura pública (para fallback)
CREATE POLICY "youtube_cache_select_public" ON public.youtube_cache
    FOR SELECT
    USING (true);

-- ============================================
-- ERROR_LOGS TABLE
-- ============================================
-- Logs estruturados para monitoramento

CREATE TABLE IF NOT EXISTS public.error_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    level TEXT NOT NULL CHECK (level IN ('debug', 'info', 'warn', 'error', 'critical')),
    message TEXT NOT NULL,
    context JSONB DEFAULT '{}'::jsonb,
    error_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas de logs
CREATE INDEX IF NOT EXISTS idx_error_logs_level ON public.error_logs(level);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON public.error_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_logs_context ON public.error_logs USING GIN (context);

-- RLS: Logs são gerenciados pelo sistema
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;

-- Política: Apenas service role pode inserir (via admin client)
-- Nenhuma política de SELECT pública (logs são sensíveis)

-- ============================================
-- CLEANUP FUNCTION
-- ============================================
-- Função para limpar dados antigos automaticamente

CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
    -- Remove cache do YouTube com mais de 24 horas
    DELETE FROM public.youtube_cache
    WHERE cached_at < NOW() - INTERVAL '24 hours';
    
    -- Remove logs com mais de 30 dias
    DELETE FROM public.error_logs
    WHERE created_at < NOW() - INTERVAL '30 days';
    
    -- Remove logs de debug/info com mais de 7 dias
    DELETE FROM public.error_logs
    WHERE level IN ('debug', 'info')
    AND created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- COMENTÁRIOS
-- ============================================
COMMENT ON TABLE public.youtube_cache IS 'Cache local de dados do YouTube para fallback quando quota excedida';
COMMENT ON TABLE public.error_logs IS 'Logs estruturados para monitoramento e debugging';
COMMENT ON FUNCTION cleanup_old_data IS 'Limpa dados antigos de cache e logs. Executar via cron job.';



