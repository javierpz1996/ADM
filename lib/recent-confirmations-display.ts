import type { RegistrationRow } from "@/lib/registrations";

export function formatConfirmationDateTime(iso: string) {
  const d = new Date(iso);
  const dateStr = d.toLocaleDateString("en-CA");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const tz =
    new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
      .formatToParts(d)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  const timeStr = tz ? `${hh}:${mm}:${ss} ${tz}` : `${hh}:${mm}:${ss}`;
  return { dateStr, timeStr };
}

/** ID corto para mostrar (no tenemos ID numérico de equipo en DB) */
export function shortRegistrationId(uuid: string) {
  return uuid.replace(/-/g, "").slice(0, 10);
}

/** Columna Player en MOST RECENT: solo nombre y apellido para players libres aceptados */
export function playerDisplayParts(
  row: RegistrationRow
): { gold: string; grey: string } {
  if (row.registration_type === "free") {
    const name =
      row.full_name?.trim() ||
      row.nick_steam?.trim() ||
      row.nickname?.trim() ||
      "—";
    return { gold: name, grey: "" };
  }
  const cap = row.captain_contact?.trim() ?? "";
  if (!cap) return { gold: "—", grey: "" };
  const i = cap.indexOf(" ");
  if (i === -1) return { gold: cap, grey: "" };
  return { gold: cap.slice(0, i), grey: cap.slice(i + 1).trim() };
}

export function teamColumnText(row: RegistrationRow): string {
  if (row.registration_type === "free") {
    return "LIBRE";
  }
  const name = row.team_name?.trim() || "—";
  const id = shortRegistrationId(row.id);
  return `${name} (ID: ${id})`;
}

export function rosterStatusText(row: RegistrationRow): string {
  if (row.registration_type === "free") {
    return "None";
  }
  return "Titular";
}
