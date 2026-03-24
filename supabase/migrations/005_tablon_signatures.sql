-- Firmas del tablón (PNG en base64, sin prefijo data:)
create table if not exists public.tablon_signatures (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  image_base64 text not null
);

create index if not exists tablon_signatures_created_at_idx
  on public.tablon_signatures (created_at desc);

comment on table public.tablon_signatures is 'Firmas dibujadas en el tablón (PNG base64)';
