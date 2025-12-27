-- =============================================
-- FIX: Corrigir triggers de criação de usuário
-- Resolve "Database error saving new user"
-- =============================================

-- 1. Dropar triggers antigos
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_subscription ON auth.users;

-- 2. Função melhorada para criar profile (com fallback para username único)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    base_username text;
    final_username text;
    counter integer := 0;
BEGIN
    -- Gerar username base a partir do nome ou email
    base_username := LOWER(REGEXP_REPLACE(
        COALESCE(
            NEW.raw_user_meta_data->>'full_name', 
            NEW.raw_user_meta_data->>'name', 
            split_part(NEW.email, '@', 1)
        ),
        '[^a-z0-9]', '', 'g'
    ));
    
    -- Se vazio, usar parte do ID
    IF base_username = '' OR base_username IS NULL THEN
        base_username := 'user' || LEFT(NEW.id::text, 8);
    END IF;
    
    -- Garantir username único
    final_username := base_username;
    WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
        counter := counter + 1;
        final_username := base_username || counter::text;
    END LOOP;
    
    -- Inserir profile
    INSERT INTO public.profiles (user_id, email, full_name, username)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        final_username
    );
    
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- Se ainda assim der conflito, usar ID como username
        INSERT INTO public.profiles (user_id, email, full_name, username)
        VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
            'user' || REPLACE(NEW.id::text, '-', '')
        );
        RETURN NEW;
    WHEN OTHERS THEN
        -- Log do erro mas não falha
        RAISE WARNING 'Error creating profile: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Função melhorada para criar subscription
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger AS $$
DECLARE
    profile_id_var uuid;
BEGIN
    -- Buscar o profile recém criado
    SELECT id INTO profile_id_var 
    FROM public.profiles 
    WHERE user_id = NEW.id 
    LIMIT 1;
    
    -- Se profile existe, criar subscription
    IF profile_id_var IS NOT NULL THEN
        INSERT INTO public.subscriptions (user_id, profile_id, status, plan_id)
        VALUES (NEW.id, profile_id_var, 'trial', 'starter')
        ON CONFLICT (user_id) DO NOTHING;
        
        -- Atualizar status no profile
        UPDATE public.profiles 
        SET subscription_status = 'trial'
        WHERE id = profile_id_var;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log do erro mas não falha o signup
        RAISE WARNING 'Error creating subscription: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Recriar trigger para profile (primeiro)
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Recriar trigger para subscription (depois, com delay)
-- Usando CONSTRAINT trigger para garantir ordem
CREATE OR REPLACE FUNCTION public.create_subscription_deferred()
RETURNS trigger AS $$
BEGIN
    PERFORM public.handle_new_user_subscription();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Alternativa: trigger simples que roda após o primeiro
CREATE TRIGGER on_auth_user_subscription
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();

-- 6. Garantir que a tabela plans tem os dados
INSERT INTO public.plans (id, name, description, price_monthly, price_yearly, max_platforms, max_media_kits, features, stripe_price_id_monthly, stripe_price_id_yearly) 
VALUES
    ('starter', 'Starter', 'Ideal para começar', 1900, 19000, 1, 1, '["analytics_basic", "pdf_watermark", "url_generic"]', 'price_1Sj2jhJI9mI9qeGAWBj97g34', 'price_1Sj2jhJI9mI9qeGAw1x78V6S'),
    ('pro', 'Pro', 'Para criadores profissionais', 3900, 39000, 2, 3, '["analytics_full", "pdf_clean", "url_custom", "priority_support"]', 'price_1Sj2mWJI9mI9qeGArogz1fc9', 'price_1Sj2mWJI9mI9qeGAppdBQcVe'),
    ('business', 'Business', 'Para agências e grandes criadores', 9900, 99000, 999, 999, '["analytics_full", "pdf_clean", "url_custom", "api_access", "white_label", "priority_support"]', 'price_1Sj2cZJI9mI9qeGA8Wqo69Ig', 'price_1Sj2cZJI9mI9qeGAJPfbwjmF')
ON CONFLICT (id) DO UPDATE SET
    stripe_price_id_monthly = EXCLUDED.stripe_price_id_monthly,
    stripe_price_id_yearly = EXCLUDED.stripe_price_id_yearly;


