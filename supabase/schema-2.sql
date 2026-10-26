-- Stap 2: foto's als eigen tabel + meerdere categorieën per project
alter table public.projects add column if not exists categories text[] not null default '{}';
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  file text not null,
  url text not null,
  alt text,
  caption text,
  event text,
  year int,
  city text,
  categories text[] not null default '{}',
  subjects text[] not null default '{}',
  credit text not null default '© 2026 Martin Hols · The Arrows',
  taken_on date,
  project_id uuid references public.projects(id) on delete set null,
  slot text check (slot in ('hero','card','wide','tall-a','tall-b')),
  marked boolean not null default false,
  portfolio boolean not null default false,
  top boolean not null default false,
  width int, height int, bytes int,
  created_at timestamptz not null default now()
);
create unique index if not exists photos_project_slot on public.photos (project_id, slot) where slot is not null and project_id is not null;
alter table public.photos enable row level security;
create policy "public read photos table" on public.photos for select using (true);
create policy "admin all photos table" on public.photos for all to authenticated using (true) with check (true);
