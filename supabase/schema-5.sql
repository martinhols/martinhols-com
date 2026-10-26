-- Vastgepinde projecten (max 4, bovenaan in Projects)
alter table public.projects add column if not exists pinned boolean not null default false;
notify pgrst, 'reload schema';
