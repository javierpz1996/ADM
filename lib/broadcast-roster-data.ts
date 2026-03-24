import type { TI16Team, TI16TeamPlayer } from "@/lib/mock-data";
import { ti16Teams } from "@/lib/mock-data";

export type BroadcastRosterPlayer = {
  id: string;
  name: string;
  countryCode: string;
};

export type BroadcastRosterTeam = {
  id: string;
  name: string;
  logoImage?: string;
  logoText: string;
  players: BroadcastRosterPlayer[];
};

const PLACEHOLDER_PHOTO = "/images/streamer/streamer1.jpg";

function fillerPlayers(teamId: string, seed: number): BroadcastRosterPlayer[] {
  const codes = ["US", "SE", "RU", "CN", "GB", "PE", "BR", "DE"];
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${teamId}-p${i + 1}`,
    name: `Player ${seed * 5 + i + 1}`,
    countryCode: codes[(seed + i) % codes.length],
  }));
}

function mapTeam(t: TI16Team, index: number): BroadcastRosterTeam {
  const players: BroadcastRosterPlayer[] =
    t.players && t.players.length >= 5
      ? (t.players.slice(0, 5) as TI16TeamPlayer[]).map((p) => ({
          id: p.id,
          name: p.name,
          countryCode: p.countryCode,
        }))
      : fillerPlayers(t.id, index);

  return {
    id: t.id,
    name: t.name,
    logoImage: t.logoImage,
    logoText: t.logo,
    players,
  };
}

/** 8 equipos en orden TI16, 5 jugadores cada uno — layout broadcast. */
export const broadcastRosterTeams: BroadcastRosterTeam[] = ti16Teams
  .slice(0, 8)
  .map((t, i) => mapTeam(t, i));

export { PLACEHOLDER_PHOTO };
