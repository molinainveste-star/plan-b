-- Create table for video performance data
CREATE TABLE public.video_performance (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    video_id text NOT NULL,
    title text NOT NULL,
    view_count bigint NOT NULL,
    published_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.video_performance ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Video performance data is viewable by everyone."
    ON public.video_performance FOR SELECT
    USING ( true );

-- Public insert/delete for MVP
CREATE POLICY "AllowPublicInsertVideoPerf" ON public.video_performance FOR INSERT WITH CHECK (true);
CREATE POLICY "AllowPublicDeleteVideoPerf" ON public.video_performance FOR DELETE USING (true);
