import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
const playerRoleSchema = z.enum([
  "carry",
  "midlaner",
  "apoyo_principal",
  "apoyo_secundario",
  "offlaner",
]);

const freeBodySchema = z.object({
  registration_type: z.literal("free"),
  nickname: z.string().min(1).max(200),
  full_name: z.string().min(1).max(200),
  player_role: playerRoleSchema,
  dotabuff_link: z.string().min(1).max(500),
  steam_id: z.string().min(1).max(120),
  dota_id: z.string().min(1).max(120),
});

const rosterMemberSchema = z.object({
  nickname: z.string().min(1).max(200),
  full_name: z.string().min(1).max(200),
  player_role: playerRoleSchema,
  dotabuff_link: z.string().min(1).max(500),
  steam_id: z.string().min(1).max(120),
  dota_id: z.string().min(1).max(120),
});

const teamBodySchema = z.object({
  registration_type: z.literal("team"),
  team_name: z.string().min(1).max(200),
  team_tag: z.string().min(1).max(50),
  captain_contact: z.string().min(1).max(500),
  roster_players: z.array(rosterMemberSchema).length(5),
  roster_substitutes: z.array(rosterMemberSchema).max(12).optional().default([]),
});

const bodySchema = z.discriminatedUnion("registration_type", [
  freeBodySchema,
  teamBodySchema,
]);

const selectColumns =
  "id, created_at, registration_type, approval_status, nickname, full_name, player_role, dotabuff_link, steam_id, dota_id, nick_steam, steam_or_contact, team_name, team_tag, captain_contact, team_roster_players, team_roster_substitutes";

/** Últimos registros para la tabla "Most recent notable confirmations" */
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("registrations")
      .select(selectColumns)
      .order("created_at", { ascending: false })
      .limit(80);

    if (error) {
      console.error("[registrations GET]", error);
      return NextResponse.json(
        { error: error.message, data: [] },
        { status: 500 }
      );
    }

    const rows = data ?? [];
    const notable = rows
      .filter(
        (r) =>
          (r.registration_type === "team" && r.approval_status === "accepted") ||
          (r.registration_type === "free" && r.approval_status === "accepted")
      )
      .slice(0, 25);

    return NextResponse.json({ data: notable });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Error al leer la base de datos.";
    console.error("[registrations GET]", e);
    return NextResponse.json({ error: message, data: [] }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo JSON inválido." },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((e) => e.message).join(" ");
    return NextResponse.json({ error: msg || "Datos inválidos." }, { status: 400 });
  }

  const d = parsed.data;

  try {
    const supabase = createAdminClient();

    if (d.registration_type === "free") {
      const row = {
        registration_type: "free" as const,
        approval_status: "pending" as const,
        nickname: d.nickname.trim(),
        full_name: d.full_name.trim(),
        player_role: d.player_role,
        dotabuff_link: d.dotabuff_link.trim(),
        steam_id: d.steam_id.trim(),
        dota_id: d.dota_id.trim(),
        nick_steam: d.nickname.trim(),
        steam_or_contact: null,
        team_name: null,
        team_tag: null,
        captain_contact: null,
      };

      const { data, error } = await supabase
        .from("registrations")
        .insert(row)
        .select("id")
        .single();

      if (error) {
        console.error("[registrations]", error);
        return NextResponse.json(
          { error: error.message || "No se pudo guardar en Supabase." },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true, id: data?.id });
    }

    const subs = (d.roster_substitutes ?? []).filter(
      (s) =>
        s.nickname.trim().length > 0 &&
        s.full_name.trim().length > 0 &&
        s.player_role.trim().length > 0 &&
        s.dotabuff_link.trim().length > 0 &&
        s.steam_id.trim().length > 0 &&
        s.dota_id.trim().length > 0
    );

    const row = {
      registration_type: "team" as const,
      approval_status: "pending" as const,
      nickname: null,
      full_name: null,
      player_role: null,
      dotabuff_link: null,
      steam_id: null,
      dota_id: null,
      nick_steam: null,
      steam_or_contact: null,
      team_name: d.team_name.trim(),
      team_tag: d.team_tag.trim(),
      captain_contact: d.captain_contact.trim(),
      team_roster_players: d.roster_players.map((p) => ({
        nickname: p.nickname.trim(),
        full_name: p.full_name.trim(),
        player_role: p.player_role,
        dotabuff_link: p.dotabuff_link.trim(),
        steam_id: p.steam_id.trim(),
        dota_id: p.dota_id.trim(),
      })),
      team_roster_substitutes:
        subs.length > 0
          ? subs.map((s) => ({
              nickname: s.nickname.trim(),
              full_name: s.full_name.trim(),
              player_role: s.player_role,
              dotabuff_link: s.dotabuff_link.trim(),
              steam_id: s.steam_id.trim(),
              dota_id: s.dota_id.trim(),
            }))
          : null,
    };

    const { data, error } = await supabase
      .from("registrations")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("[registrations]", error);
      return NextResponse.json(
        { error: error.message || "No se pudo guardar en Supabase." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Error al conectar con la base de datos.";
    console.error("[registrations]", e);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
