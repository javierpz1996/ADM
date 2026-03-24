"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type RegistrationType = "free" | "team";

type Props = {
  registrationType: RegistrationType;
  label: string;
  disabled?: boolean;
};

export function ClearDeclinedButton({
  registrationType,
  label,
  disabled = false,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const kind =
      registrationType === "free"
        ? "todos los players libres rechazados"
        : "todos los equipos rechazados";
    const ok = window.confirm(
      `¿Seguro que querés eliminar ${kind} de la base? Esta acción no se puede deshacer.`
    );
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch("/api/registrations/clear-declined", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration_type: registrationType }),
      });
      const data = (await res.json()) as { error?: string; deleted?: number };
      if (!res.ok) {
        throw new Error(data.error || "No se pudo limpiar.");
      }
      toast.success(
        data.deleted === 0
          ? "No había registros para eliminar."
          : `Se eliminaron ${data.deleted} registro(s).`
      );
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={handleClick}
      className="mt-3 w-full border border-red-500/50 bg-red-950/40 px-3 py-2 text-xs font-bold uppercase tracking-wide text-red-200 transition-colors hover:bg-red-950/60 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading ? "Eliminando…" : label}
    </button>
  );
}
