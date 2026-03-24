"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { Eraser, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cropSignaturePng } from "@/lib/tablon-crop";
import { renderPathsToPngDataUrl } from "@/lib/tablon-render-paths";

type SignatureRow = {
  id: string;
  createdAt: string;
  dataUrl: string;
  positionX: number;
  positionY: number;
};

function rotationFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h + id.charCodeAt(i) * (i + 1)) % 360;
  }
  return (h % 9) - 4;
}

export function TablonTablero() {
  const [items, setItems] = useState<SignatureRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasStroke, setHasStroke] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/tablon/signatures");
      const json = (await res.json()) as {
        data?: SignatureRow[];
        error?: string;
      };
      if (!res.ok) {
        throw new Error(json.error ?? "Error al cargar");
      }
      setItems(json.data ?? []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo cargar el tablón");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const clearDrawing = () => {
    canvasRef.current?.clearCanvas();
    setHasStroke(false);
  };

  const handleSave = async () => {
    if (!hasStroke) {
      toast.error("Dibujá algo antes de guardar.");
      return;
    }
    const ref = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!ref || !wrap) return;

    setSaving(true);
    try {
      const paths = await ref.exportPaths();
      if (paths.length === 0) {
        toast.error("No hay trazos para guardar.");
        return;
      }
      const hasDrawStroke = paths.some(
        (p) => p.drawMode && p.paths.length > 0
      );
      if (!hasDrawStroke) {
        toast.error("No hay trazo visible para guardar (solo borrador).");
        return;
      }

      const { width: cw, height: ch } = wrap.getBoundingClientRect();
      if (cw < 8 || ch < 8) {
        toast.error("Esperá a que cargue el tablero.");
        return;
      }

      const fullPng = renderPathsToPngDataUrl(paths, cw, ch);
      const { rawBase64, positionX, positionY } = await cropSignaturePng(
        fullPng,
        paths,
        cw,
        ch
      );

      const res = await fetch("/api/tablon/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: rawBase64,
          positionX,
          positionY,
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(
          typeof json.error === "string" ? json.error : "No se pudo guardar"
        );
      }
      toast.success("Firma guardada en el tablón.");
      clearDrawing();
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1
          className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "'Bison Bold', sans-serif" }}
        >
          Tablón
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Dibujá donde quieras; al guardar, la firma queda en ese lugar del
          tablero. Podés borrar el dibujo actual o guardarlo.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          className="gap-2 border-white/20 bg-[#1e1b4b]/50 text-white/90 hover:border-[#a78bfa]/40 hover:bg-[#1e1b4b]/80 hover:text-white"
          onClick={clearDrawing}
        >
          <Eraser className="size-4" />
          Borrar
        </Button>
        <Button
          type="button"
          disabled={saving || !hasStroke}
          onClick={handleSave}
          className="gap-2 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:from-[#7c3aed]/90 hover:to-[#6366f1]/90 disabled:opacity-50"
        >
          <Save className="size-4" />
          {saving ? "Guardando…" : "Guardar firma"}
        </Button>
      </div>

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg border-[10px] border-[#1e1b4b] bg-[#0f0a2e]",
          "shadow-[inset_0_0_100px_rgba(0,0,0,0.45),0_0_48px_rgba(99,102,241,0.12)]",
          "ring-1 ring-[#6366f1]/25"
        )}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(99,102,241,0.07) 0%, transparent 45%),
            radial-gradient(ellipse 100% 70% at 50% -5%, rgba(124,58,237,0.15), transparent 55%),
            linear-gradient(135deg, rgba(30,27,75,0.9) 0%, rgba(15,10,46,0.95) 100%)`,
        }}
      >
        {/* Altura fija: si solo hay capas absolute, el lienzo puede quedar 0×0 y exportImage falla */}
        <div className="relative h-[min(70vh,640px)] w-full">
          {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0f0a2e]/90 text-[#c4b5fd] backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wide">
                Cargando firmas…
              </span>
            </div>
          )}

          {/* Firmas guardadas (debajo del lienzo) */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            aria-hidden
          >
            {!loading && items.length === 0 ? (
              <p className="absolute inset-0 flex items-center justify-center p-8 text-center text-lg text-white/50">
                Todavía no hay firmas. Dibujá y tocá{" "}
                <span className="mx-1 font-semibold text-[#a78bfa]">
                  Guardar firma
                </span>
                .
              </p>
            ) : (
              items.map((sig) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={sig.id}
                  src={sig.dataUrl}
                  alt=""
                  className="absolute max-h-40 max-w-[min(260px,45vw)] object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                  style={{
                    left: `${sig.positionX * 100}%`,
                    top: `${sig.positionY * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${rotationFromId(sig.id)}deg)`,
                  }}
                />
              ))
            )}
          </div>

          {/* Lienzo siempre montado para que el ref interno del SVG exista al exportar */}
          <div
            ref={canvasWrapRef}
            className="absolute inset-0 z-[2] h-full w-full"
          >
            <ReactSketchCanvas
              id="tablon-sketch"
              ref={canvasRef}
              width="100%"
              height="100%"
              strokeWidth={3}
              strokeColor="#e9e5ff"
              canvasColor="transparent"
              onChange={(paths) => setHasStroke(paths.length > 0)}
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                touchAction: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
