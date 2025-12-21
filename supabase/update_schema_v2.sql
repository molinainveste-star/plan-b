-- Add engagement columns to video_performance
ALTER TABLE public.video_performance 
ADD COLUMN IF NOT EXISTS like_count bigint DEFAULT 0,
ADD COLUMN IF NOT EXISTS comment_count bigint DEFAULT 0;

-- Add sales and verification columns to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS demographics jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS pricing_packages jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS brand_cases jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;
