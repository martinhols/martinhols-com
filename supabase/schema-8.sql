-- Bevindingen van SEO-agents en controles. Agents schrijven hier voorstellen in; Martin keurt ze goed in de admin (SEO-tab).
create table if not exists public.seo_findings (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  kind text not null,                       -- bv. title-long, thin-content, keyword-gap, ai-answer
  severity text not null default 'medium',  -- high | medium | low
  message text not null,
  suggestion jsonb,                         -- {"title": "...", "description": "...", "og_title": "..."} (optioneel)
  source text not null default 'agent',     -- welke agent of controle
  status text not null default 'open',      -- open | applied | dismissed
  created_at timestamptz default now(),
  resolved_at timestamptz
);
create index if not exists seo_findings_status on public.seo_findings (status, created_at desc);
alter table public.seo_findings enable row level security;
drop policy if exists "admin all findings" on public.seo_findings;
create policy "admin all findings" on public.seo_findings for all to authenticated using (true) with check (true);
notify pgrst, 'reload schema';
