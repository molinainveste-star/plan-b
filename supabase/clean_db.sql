-- Limpar todas as tabelas (Truncate)
-- A ordem é importante devido às chaves estrangeiras (Foreign Keys)
-- Primeiro tabelas dependentes, depois a tabela principal

TRUNCATE TABLE public.video_performance CASCADE;
TRUNCATE TABLE public.social_accounts CASCADE;
TRUNCATE TABLE public.metrics CASCADE;
TRUNCATE TABLE public.profiles CASCADE;

-- Se precisar reiniciar sequências (se houver, no caso de UUIDs não é comum precisar, mas mantém limpo)
-- Como são UUIDs gerados randomicamente, não precisa resetar sequencia de ID.
