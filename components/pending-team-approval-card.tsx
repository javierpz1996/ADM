"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { RegistrationRow } from "@/lib/registrations";
import { formatPlayerRoleLabel } from "@/lib/player-roles";
import { parseTeamRosterJson } from "@/lib/team-roster";

type Props = {
  registration: RegistrationRow;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function PendingTeamApprovalCard({ registration }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const starters = parseTeamRosterJson(registration.team_roster_players) ?? [];
  const subs = parseTeamRosterJson(registration.team_roster_substitutes) ?? [];

  async function handleAction(action: "accept" | "decline") {
    setLoading(true);
    try {
      const res = await fetch(`/api/registrations/${registration.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "No se pudo actualizar.");
      }
      toast.success(action === "accept" ? "Equipo aceptado." : "Equipo rechazado.");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="border border-cyan-400/30 bg-[#0f172a]/90 px-4 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold uppercase tracking-wide text-white">
          {registration.team_name?.trim() || "—"}{" "}
          <span className="text-[#38bdf8]">[{registration.team_tag?.trim() || "—"}]</span>
        </h3>
        <span className="text-xs text-cyan-200/70">Pendiente de revisión</span>
      </div>

      <dl className="mt-3 space-y-1.5 text-sm text-white/75">
        <div>
          <dt className="inline text-white/45">Capitán / contacto: </dt>
          <dd className="inline break-all">
            {registration.captain_contact?.trim() || "—"}
          </dd>
        </div>
        <div>
          <dt className="inline text-white/45">Fecha de registro: </dt>
          <dd className="inline">{formatDate(registration.created_at)}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="text-xs font-bold uppercase tracking-wider text-white/45">
          Titulares ({starters.length})
        </p>
        {starters.length === 0 ? (
          <p className="mt-1 text-sm text-white/60">No hay titulares cargados.</p>
        ) : (
          <ul className="mt-2 space-y-3">
            {starters.map((p, i) => (
              <li key={`starter-${i}`} className="border border-white/10 px-3 py-2 text-sm">
                <p className="text-white">
                  <span className="font-bold text-[#a78bfa]">{p.nickname || "—"}</span>
                  {" — "}
                  {p.full_name || "—"}
                </p>
                <p className="text-white/70">
                  Rol: <span className="text-white/85">{formatPlayerRoleLabel(p.player_role)}</span>
                </p>
                <p className="break-all text-white/70">
                  Dotabuff:{" "}
                  {p.dotabuff_link ? (
                    <a
                      href={p.dotabuff_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6ba3e8] underline hover:text-[#93c5fd]"
                    >
                      {p.dotabuff_link}
                    </a>
                  ) : (
                    "—"
                  )}
                </p>
                <p className="text-white/70">Steam ID: {p.steam_id || "—"}</p>
                <p className="text-white/70">Dota ID: {p.dota_id || "—"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="text-xs font-bold uppercase tracking-wider text-white/45">
          Suplentes ({subs.length})
        </p>
        {subs.length === 0 ? (
          <p className="mt-1 text-sm text-white/60">No hay suplentes cargados.</p>
        ) : (
          <ul className="mt-2 space-y-3">
            {subs.map((p, i) => (
              <li key={`sub-${i}`} className="border border-white/10 px-3 py-2 text-sm">
                <p className="text-white">
                  <span className="font-bold text-[#38bdf8]">{p.nickname || "—"}</span>
                  {" — "}
                  {p.full_name || "—"}
                </p>
                <p className="text-white/70">
                  Rol: <span className="text-white/85">{formatPlayerRoleLabel(p.player_role)}</span>
                </p>
                <p className="break-all text-white/70">
                  Dotabuff:{" "}
                  {p.dotabuff_link ? (
                    <a
                      href={p.dotabuff_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6ba3e8] underline hover:text-[#93c5fd]"
                    >
                      {p.dotabuff_link}
                    </a>
                  ) : (
                    "—"
                  )}
                </p>
                <p className="text-white/70">Steam ID: {p.steam_id || "—"}</p>
                <p className="text-white/70">Dota ID: {p.dota_id || "—"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleAction("accept")}
          className="border border-emerald-500/60 bg-emerald-600/20 px-4 py-2 text-sm font-bold uppercase tracking-wide text-emerald-300 transition-colors hover:bg-emerald-600/35 disabled:opacity-50"
        >
          Aceptar
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => handleAction("decline")}
          className="border border-red-500/50 bg-red-950/40 px-4 py-2 text-sm font-bold uppercase tracking-wide text-red-300 transition-colors hover:bg-red-950/60 disabled:opacity-50"
        >
          Declinar
        </button>
      </div>
    </li>
  );
}
