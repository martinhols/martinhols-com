-- Foto's verbergen in de portfolio-keuzetool (blijft bewaard, alleen uit het overzicht)
alter table public.photos add column if not exists archived boolean not null default false;
notify pgrst, 'reload schema';
