-- Ejecutá este SQL en Supabase → SQL Editor (o como migración).
-- Tabla para registros desde /registrarme (player libre o equipo).

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  registration_type text not null check (registration_type in ('free', 'team')),
  nick_steam text,
  steam_or_contact text,
  team_name text,
  team_tag text,
  captain_contact text
);

comment on table public.registrations is 'Inscripciones Argentina Dota Masters S1 (player libre / equipo).';

create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

alter table public.registrations enable row level security;

-- La API usa SUPABASE_SERVICE_ROLE_KEY y no está sujeta a RLS.
-- Si más adelante querés insertar desde el cliente con anon key, agregá una política INSERT para anon.
