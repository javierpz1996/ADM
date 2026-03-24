-- Plantilla: 5 titulares (JSON) + suplentes opcionales (JSON).
-- Ejecutá en Supabase SQL Editor.

alter table public.registrations
  add column if not exists team_roster_players jsonb,
  add column if not exists team_roster_substitutes jsonb;

comment on column public.registrations.team_roster_players is
  'Array de 5 objetos titulares { nickname, full_name, player_role, dotabuff_link, steam_id, dota_id }';
comment on column public.registrations.team_roster_substitutes is
  'Array opcional de suplentes { nickname, full_name, player_role, dotabuff_link, steam_id, dota_id }';
