-- SEO per pagina aanpasbaar in de admin (titel, beschrijving, deel-titel, noindex)
create table if not exists public.seo_pages (
  path text primary key,
  title text,
  description text,
  og_title text,
  og_description text,
  noindex boolean,
  updated_at timestamptz default now()
);
alter table public.seo_pages enable row level security;
drop policy if exists "public read seo" on public.seo_pages;
create policy "public read seo" on public.seo_pages for select using (true);
drop policy if exists "admin all seo" on public.seo_pages;
create policy "admin all seo" on public.seo_pages for all to authenticated using (true) with check (true);
notify pgrst, 'reload schema';
