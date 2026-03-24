-- Perfil extendido para player libre (nickname, nombre, rol, Dotabuff, Steam, Dota).
-- Ejecutá en Supabase SQL Editor después de 001 y 002.

alter table public.registrations
  add column if not exists nickname text,
  add column if not exists full_name text,
  add column if not exists player_role text,
  add column if not exists dotabuff_link text,
  add column if not exists steam_id text,
  add column if not exists dota_id text;

update public.registrations
set nickname = coalesce(nickname, nick_steam)
where registration_type = 'free'
  and nickname is null
  and nick_steam is not null;

comment on column public.registrations.nickname is 'Nickname in-game';
comment on column public.registrations.full_name is 'Nombre y apellido';
comment on column public.registrations.player_role is 'Rol preferido (carry, midlaner, etc.)';
