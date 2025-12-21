-- ============================================
-- PUBLISCORE - Migration 003: Profile Extensions
-- ============================================
-- Adiciona campos extras para:
-- - Demografia da audiência
-- - Pacotes de preços
-- - Cases de marca
-- - Badge de verificação
-- ============================================

-- Adiciona colunas extras ao profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS demographics jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS pricing_packages jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS brand_cases jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;

-- ============================================
-- COMMENTS (Documentação)
-- ============================================
COMMENT ON COLUMN public.profiles.demographics IS 'Dados demográficos da audiência (idade, gênero, país) - via YouTube Analytics';
COMMENT ON COLUMN public.profiles.pricing_packages IS 'Pacotes de preços para parcerias [{title, price, features[], isPopular}]';
COMMENT ON COLUMN public.profiles.brand_cases IS 'Cases de marcas anteriores [{brandName, logoUrl, description, metrics}]';
COMMENT ON COLUMN public.profiles.is_verified IS 'Indica se o criador conectou a conta do YouTube via OAuth';

