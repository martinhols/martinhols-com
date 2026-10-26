-- MartinHols.com: tabellen voor projecten en blogartikelen
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('festivals','corporate','sport','shows-music')),
  event_name text,
  client text,
  location text,
  event_date date,
  summary text,
  hero_url text,
  gallery jsonb not null default '[]',
  faq jsonb not null default '[]',
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  type text not null check (type in ('guide','story')),
  title text not null,
  description text,
  short_answer text,
  body text,
  hero_url text,
  faq jsonb not null default '[]',
  published boolean not null default false,
  published_at date,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
alter table public.posts enable row level security;
-- Bezoekers lezen alleen gepubliceerde items; ingelogde beheerders mogen alles
create policy "public read projects" on public.projects for select using (published = true);
create policy "admin all projects" on public.projects for all to authenticated using (true) with check (true);
create policy "public read posts" on public.posts for select using (published = true);
create policy "admin all posts" on public.posts for all to authenticated using (true) with check (true);
-- Opslag voor foto's
insert into storage.buckets (id, name, public) values ('photos','photos',true) on conflict do nothing;
create policy "public read photos" on storage.objects for select using (bucket_id = 'photos');
create policy "admin write photos" on storage.objects for all to authenticated using (bucket_id = 'photos') with check (bucket_id = 'photos');
