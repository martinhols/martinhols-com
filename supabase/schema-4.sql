-- Focuspunt per foto (0-100, % vanaf links/boven) voor hero en categorie-headers
alter table public.photos add column if not exists focus_x int;
alter table public.photos add column if not exists focus_y int;
notify pgrst, 'reload schema';
