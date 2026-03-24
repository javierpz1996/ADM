import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const postBodySchema = z.object({
  imageBase64: z
    .string()
    .min(1, "Firma vacía")
    .max(5_000_000, "Imagen demasiado grande"),
  positionX: z.number().min(0).max(1),
  positionY: z.number().min(0).max(1),
});

function toRawBase64(input: string): string {
  const s = input.trim();
  const m = /^data:image\/\w+;base64,(.+)$/i.exec(s);
  return m ? m[1]! : s;
}

/** Lista firmas (más recientes primero) */
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("tablon_signatures")
      .select("id, created_at, image_base64, position_x, position_y")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[tablon/signatures GET]", error);
      return NextResponse.json(
        { error: error.message, data: [] },
        { status: 500 }
      );
    }

    const rows = (data ?? []).map((row) => {
      const r = row as {
        id: string;
        created_at: string;
        image_base64: string;
        position_x: number;
        position_y: number;
      };
      return {
        id: r.id,
        createdAt: r.created_at,
        dataUrl: `data:image/png;base64,${r.image_base64}`,
        positionX: Number(r.position_x ?? 0.5),
        positionY: Number(r.position_y ?? 0.5),
      };
    });

    return NextResponse.json({ data: rows });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Error al leer la base de datos.";
    console.error("[tablon/signatures GET]", e);
    return NextResponse.json({ error: message, data: [] }, { status: 503 });
  }
}

/** Guarda una firma (PNG base64 recortado) y posición del centro (0–1) */
export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = postBodySchema.safeParse(json);
    if (!parsed.success) {
      const msg = parsed.error.errors.map((e) => e.message).join(" ");
      return NextResponse.json({ error: msg || "Datos inválidos" }, { status: 400 });
    }

    const raw = toRawBase64(parsed.data.imageBase64);
    if (raw.length < 50) {
      return NextResponse.json(
        { error: "Firma inválida o demasiado pequeña." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("tablon_signatures")
      .insert({
        image_base64: raw,
        position_x: parsed.data.positionX,
        position_y: parsed.data.positionY,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("[tablon/signatures POST]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      id: data.id,
      createdAt: data.created_at,
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Error al guardar la firma.";
    console.error("[tablon/signatures POST]", e);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
