import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const bodySchema = z.object({
  registration_type: z.enum(["free", "team"]),
});

/**
 * Elimina de la base todos los registros con approval_status = declined
 * del tipo indicado (player libre o equipo).
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Tipo inválido. Usá free o team." },
      { status: 400 }
    );
  }

  const registrationType = parsed.data.registration_type;

  try {
    const supabase = createAdminClient();

    const { count: toDelete, error: countError } = await supabase
      .from("registrations")
      .select("id", { count: "exact", head: true })
      .eq("approval_status", "declined")
      .eq("registration_type", registrationType);

    if (countError) {
      console.error("[clear-declined count]", countError);
      return NextResponse.json(
        { error: countError.message || "No se pudo contar registros." },
        { status: 500 }
      );
    }

    const { error: deleteError } = await supabase
      .from("registrations")
      .delete()
      .eq("approval_status", "declined")
      .eq("registration_type", registrationType);

    if (deleteError) {
      console.error("[clear-declined]", deleteError);
      return NextResponse.json(
        { error: deleteError.message || "No se pudo eliminar." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      deleted: toDelete ?? 0,
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Error al conectar con la base de datos.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
