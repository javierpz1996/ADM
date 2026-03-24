export const PLAYER_ROLE_VALUES = [
  "carry",
  "midlaner",
  "apoyo_principal",
  "apoyo_secundario",
  "offlaner",
] as const;

export type PlayerRole = (typeof PLAYER_ROLE_VALUES)[number];

export const PLAYER_ROLE_LABELS: Record<PlayerRole, string> = {
  carry: "Carry",
  midlaner: "Midlaner",
  apoyo_principal: "Apoyo principal",
  apoyo_secundario: "Apoyo secundario",
  offlaner: "Offlaner",
};

export function formatPlayerRoleLabel(role: string | null | undefined): string {
  if (!role) return "—";
  return PLAYER_ROLE_LABELS[role as PlayerRole] ?? role;
}
