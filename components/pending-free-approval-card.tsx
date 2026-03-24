"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { RegistrationRow } from "@/lib/registrations";
import { formatPlayerRoleLabel } from "@/lib/player-roles";

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

export function PendingFreeApprovalCard({ registration }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const nick =
    registration.nickname?.trim() ||
    registration.nick_steam?.trim() ||
    "—";

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
      toast.success(
        action === "accept"
          ? "Player aceptado. Aparecerá en confirmaciones recientes."
          : "Solicitud rechazada."
      );
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="border border-amber-500/30 bg-[#0f172a]/90 px-4 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-lg font-bold uppercase tracking-wide text-white">
          {nick}
        </span>
        <span className="text-xs text-amber-200/70">Pendiente de revisión</span>
      </div>
      <dl className="mt-3 space-y-1.5 text-sm text-white/75">
        <div>
          <dt className="inline text-white/45">Nombre y apellido: </dt>
          <dd className="inline">
            {registration.full_name?.trim() || "—"}
          </dd>
        </div>
        <div>
          <dt className="inline text-white/45">Rol: </dt>
          <dd className="inline">
            {formatPlayerRoleLabel(registration.player_role)}
          </dd>
        </div>
        <div>
          <dt className="inline text-white/45">Dotabuff: </dt>
          <dd className="inline break-all">
            {registration.dotabuff_link?.trim() ? (
              <a
                href={registration.dotabuff_link.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6ba3e8] underline hover:text-[#93c5fd]"
              >
                {registration.dotabuff_link.trim()}
              </a>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div>
          <dt className="inline text-white/45">Steam ID: </dt>
          <dd className="inline">{registration.steam_id?.trim() || "—"}</dd>
        </div>
        <div>
          <dt className="inline text-white/45">Dota ID: </dt>
          <dd className="inline">{registration.dota_id?.trim() || "—"}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-white/40">
        Registro: {formatDate(registration.created_at)}
      </p>
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
