-- Allow public inserts for metrics (for MVP)
CREATE POLICY "AllowPublicInsertMetrics" ON public.metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "AllowPublicDeleteMetrics" ON public.metrics FOR DELETE USING (true);

-- Allow public inserts for social_accounts (for MVP)
CREATE POLICY "AllowPublicInsertSocials" ON public.social_accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "AllowPublicDeleteSocials" ON public.social_accounts FOR DELETE USING (true);
