import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const patchSchema = z.object({
  action: z.enum(["accept", "decline"]),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Acción inválida. Usá accept o decline." },
      { status: 400 }
    );
  }

  const action = parsed.data.action;

  try {
    const supabase = createAdminClient();
    const { data: row, error: fetchError } = await supabase
      .from("registrations")
      .select("id, registration_type, approval_status")
      .eq("id", id)
      .single();

    if (fetchError || !row) {
      return NextResponse.json({ error: "Registro no encontrado." }, { status: 404 });
    }

    if (row.approval_status !== "pending") {
      return NextResponse.json(
        { error: "Esta solicitud ya fue procesada." },
        { status: 400 }
      );
    }

    const nextStatus = action === "accept" ? "accepted" : "declined";

    const { error: updateError } = await supabase
      .from("registrations")
      .update({ approval_status: nextStatus })
      .eq("id", id);

    if (updateError) {
      console.error("[registrations PATCH]", updateError);
      return NextResponse.json(
        { error: updateError.message || "No se pudo actualizar." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, approval_status: nextStatus });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Error al conectar con la base de datos.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
