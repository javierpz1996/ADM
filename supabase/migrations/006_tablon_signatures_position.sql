alter table public.tablon_signatures
  add column if not exists position_x double precision default 0.5;

alter table public.tablon_signatures
  add column if not exists position_y double precision default 0.5;

update public.tablon_signatures set position_x = 0.5 where position_x is null;
update public.tablon_signatures set position_y = 0.5 where position_y is null;

alter table public.tablon_signatures
  alter column position_x set not null,
  alter column position_y set not null;

alter table public.tablon_signatures
  alter column position_x set default 0.5,
  alter column position_y set default 0.5;
