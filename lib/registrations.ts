import { createAdminClient } from "@/lib/supabase/admin";

export type ApprovalStatus = "pending" | "accepted" | "declined";

export type RegistrationRow = {
  id: string;
  created_at: string;
  registration_type: "free" | "team";
  approval_status: ApprovalStatus | null;
  /** Player libre */
  nickname: string | null;
  full_name: string | null;
  player_role: string | null;
  dotabuff_link: string | null;
  steam_id: string | null;
  dota_id: string | null;
  /** Legacy (antes de 003) */
  nick_steam: string | null;
  steam_or_contact: string | null;
  team_name: string | null;
  team_tag: string | null;
  captain_contact: string | null;
  /** Equipo: 5 titulares JSON */
  team_roster_players: unknown | null;
  /** Equipo: suplentes opcionales JSON */
  team_roster_substitutes: unknown | null;
};

export async function getRegistrationsForInfo(): Promise<{
  pendingFreePlayers: RegistrationRow[];
  pendingTeams: RegistrationRow[];
  acceptedFreePlayers: RegistrationRow[];
  acceptedTeams: RegistrationRow[];
  declinedFreePlayers: RegistrationRow[];
  declinedTeams: RegistrationRow[];
  error: string | null;
}> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("registrations")
      .select(
        "id, created_at, registration_type, approval_status, nickname, full_name, player_role, dotabuff_link, steam_id, dota_id, nick_steam, steam_or_contact, team_name, team_tag, captain_contact, team_roster_players, team_roster_substitutes"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getRegistrationsForInfo]", error);
      return {
        pendingFreePlayers: [],
        pendingTeams: [],
        acceptedFreePlayers: [],
        acceptedTeams: [],
        declinedFreePlayers: [],
        declinedTeams: [],
        error: error.message,
      };
    }

    const rows = (data ?? []) as RegistrationRow[];
    const free = rows.filter((r) => r.registration_type === "free");
    const teams = rows.filter((r) => r.registration_type === "team");
    return {
      pendingFreePlayers: free.filter((r) => r.approval_status === "pending"),
      pendingTeams: teams.filter((r) => r.approval_status === "pending"),
      acceptedFreePlayers: free.filter((r) => r.approval_status === "accepted"),
      acceptedTeams: teams.filter((r) => r.approval_status === "accepted"),
      declinedFreePlayers: free.filter((r) => r.approval_status === "declined"),
      declinedTeams: teams.filter((r) => r.approval_status === "declined"),
      error: null,
    };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "No se pudieron cargar los datos.";
    return {
      pendingFreePlayers: [],
      pendingTeams: [],
      acceptedFreePlayers: [],
      acceptedTeams: [],
      declinedFreePlayers: [],
      declinedTeams: [],
      error: message,
    };
  }
}
