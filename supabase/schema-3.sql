-- Stap 3: foto's kiezen voor de homepage-hero en de categorie-headers
alter table public.photos add column if not exists home_hero int;
alter table public.photos add column if not exists cat_header text;
