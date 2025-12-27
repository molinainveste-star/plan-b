-- =============================================
-- Migration: Subscription System
-- Sistema de assinaturas com trial de 5 dias
-- =============================================

-- 1. Criar ENUM para status da subscription
DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'cancelled', 'expired', 'past_due');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Criar tabela de planos
CREATE TABLE IF NOT EXISTS public.plans (
    id text PRIMARY KEY,
    name text NOT NULL,
    description text,
    price_monthly integer NOT NULL, -- em centavos (R$ 19,00 = 1900)
    price_yearly integer, -- em centavos
    max_platforms integer NOT NULL DEFAULT 1,
    max_media_kits integer NOT NULL DEFAULT 1,
    features jsonb DEFAULT '[]',
    stripe_price_id_monthly text,
    stripe_price_id_yearly text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT timezone('utc'::text, now()),
    updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- 3. Inserir planos padrão
INSERT INTO public.plans (id, name, description, price_monthly, price_yearly, max_platforms, max_media_kits, features) VALUES
('starter', 'Starter', 'Ideal para começar', 1900, 19000, 1, 1, '["analytics_basic", "pdf_watermark", "url_generic"]'),
('pro', 'Pro', 'Para criadores profissionais', 3900, 39000, 2, 3, '["analytics_full", "pdf_clean", "url_custom", "priority_support"]'),
('business', 'Business', 'Para agências e grandes criadores', 9900, 99000, 999, 999, '["analytics_full", "pdf_clean", "url_custom", "api_access", "white_label", "priority_support"]')
ON CONFLICT (id) DO UPDATE SET
    price_monthly = EXCLUDED.price_monthly,
    price_yearly = EXCLUDED.price_yearly,
    max_platforms = EXCLUDED.max_platforms,
    max_media_kits = EXCLUDED.max_media_kits,
    features = EXCLUDED.features;

-- 4. Criar tabela de subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id text REFERENCES public.plans(id) DEFAULT 'starter',
    status subscription_status DEFAULT 'trial',
    
    -- Datas importantes
    trial_started_at timestamptz DEFAULT timezone('utc'::text, now()),
    trial_ends_at timestamptz DEFAULT (timezone('utc'::text, now()) + interval '5 days'),
    current_period_start timestamptz,
    current_period_end timestamptz,
    cancelled_at timestamptz,
    
    -- Stripe
    stripe_customer_id text,
    stripe_subscription_id text,
    stripe_price_id text,
    
    -- Metadata
    created_at timestamptz DEFAULT timezone('utc'::text, now()),
    updated_at timestamptz DEFAULT timezone('utc'::text, now()),
    
    -- Constraints
    CONSTRAINT unique_user_subscription UNIQUE (user_id)
);

-- 5. Enable RLS
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies para plans (público para leitura)
CREATE POLICY "Plans are viewable by everyone" 
ON public.plans FOR SELECT USING (true);

-- 7. RLS Policies para subscriptions (usuário vê apenas a sua)
CREATE POLICY "Users can view own subscription" 
ON public.subscriptions FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can update own subscription" 
ON public.subscriptions FOR UPDATE 
USING (user_id = auth.uid());

-- 8. Policy para service role inserir/atualizar
CREATE POLICY "Service role can manage subscriptions" 
ON public.subscriptions FOR ALL 
USING (auth.role() = 'service_role');

-- 9. Adicionar campos na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS trial_used boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'none';

-- 10. Função para criar subscription automaticamente no signup
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger AS $$
DECLARE
    profile_record RECORD;
BEGIN
    -- Aguarda o profile ser criado (trigger anterior)
    SELECT id INTO profile_record FROM public.profiles WHERE user_id = NEW.id LIMIT 1;
    
    -- Cria subscription com trial de 5 dias
    INSERT INTO public.subscriptions (user_id, profile_id, status, plan_id)
    VALUES (NEW.id, profile_record.id, 'trial', 'starter')
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Atualiza profile
    UPDATE public.profiles 
    SET subscription_status = 'trial'
    WHERE user_id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Trigger para criar subscription no signup
DROP TRIGGER IF EXISTS on_auth_user_subscription ON auth.users;
CREATE TRIGGER on_auth_user_subscription
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();

-- 12. Função para verificar se trial expirou
CREATE OR REPLACE FUNCTION public.check_trial_expired()
RETURNS void AS $$
BEGIN
    UPDATE public.subscriptions
    SET status = 'expired'
    WHERE status = 'trial' 
    AND trial_ends_at < now();
    
    UPDATE public.profiles p
    SET subscription_status = 'expired'
    FROM public.subscriptions s
    WHERE s.profile_id = p.id 
    AND s.status = 'expired';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. Índices para performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_trial_ends_at ON public.subscriptions(trial_ends_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);

-- 14. Constraint para social_tokens (impedir mesma conta em múltiplos usuários)
-- Já existe na migration anterior, mas garantimos aqui
DO $$ BEGIN
    ALTER TABLE public.social_tokens 
    ADD CONSTRAINT unique_provider_account UNIQUE (provider, provider_user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 15. Trigger para updated_at
CREATE TRIGGER subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

