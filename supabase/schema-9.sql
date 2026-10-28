-- Per categorie een eigen fotoselectie (los van het hoofdportfolio en los van andere categorieën).
-- cat_picks = de categorieën waarvoor deze foto gekozen is, bv. {festivals,sport}.
alter table public.photos add column if not exists cat_picks text[] not null default '{}';
-- Eenmalig: wat nu in het portfolio staat, blijft in de categorieën staan waar de foto bij hoort.
update public.photos set cat_picks = categories where portfolio = true and cat_picks = '{}' and categories is not null;
notify pgrst, 'reload schema';
