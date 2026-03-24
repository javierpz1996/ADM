import type { PlayerRole } from "@/lib/player-roles";

/** Jugador en plantilla de equipo (titular o suplente) */
export type TeamRosterMember = {
  nickname: string;
  full_name: string;
  player_role: PlayerRole;
  dotabuff_link: string;
  steam_id: string;
  dota_id: string;
};

export const TEAM_STARTERS_COUNT = 5;

export function emptyRosterMember(): TeamRosterMember {
  return {
    nickname: "",
    full_name: "",
    player_role: "carry",
    dotabuff_link: "",
    steam_id: "",
    dota_id: "",
  };
}

export function parseTeamRosterJson(
  raw: unknown
): TeamRosterMember[] | null {
  if (!raw || !Array.isArray(raw)) return null;
  const out: TeamRosterMember[] = [];
  for (const item of raw) {
    if (
      item &&
      typeof item === "object" &&
      "nickname" in item &&
      "full_name" in item
    ) {
      const n = String((item as TeamRosterMember).nickname ?? "").trim();
      const f = String((item as TeamRosterMember).full_name ?? "").trim();
      const role = String((item as TeamRosterMember).player_role ?? "").trim();
      const db = String((item as TeamRosterMember).dotabuff_link ?? "").trim();
      const sid = String((item as TeamRosterMember).steam_id ?? "").trim();
      const did = String((item as TeamRosterMember).dota_id ?? "").trim();
      if (n || f || role || db || sid || did) {
        out.push({
          nickname: n,
          full_name: f,
          player_role: (role || "carry") as PlayerRole,
          dotabuff_link: db,
          steam_id: sid,
          dota_id: did,
        });
      }
    }
  }
  return out.length ? out : null;
}
