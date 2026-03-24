-- Aprobación de players libres (pending → accepted | declined)
-- Ejecutá en Supabase SQL Editor si ya tenés la tabla sin esta columna.

alter table public.registrations
  add column if not exists approval_status text
  check (
    approval_status is null
    or approval_status in ('pending', 'accepted', 'declined')
  );

-- Registros existentes: equipos y players ya listados quedan aceptados
update public.registrations
set approval_status = 'accepted'
where approval_status is null;

comment on column public.registrations.approval_status is
  'free: pending hasta moderación; accepted/declined. team: accepted.';
