import { Navbar } from "@/components/navbar";
import { getRegistrationsForInfo } from "@/lib/registrations";
import { PendingFreeApprovalCard } from "@/components/pending-free-approval-card";
import { PendingTeamApprovalCard } from "@/components/pending-team-approval-card";
import { ClearDeclinedButton } from "@/components/clear-declined-button";
import { formatPlayerRoleLabel } from "@/lib/player-roles";
import { parseTeamRosterJson } from "@/lib/team-roster";

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

type Props = {
  heading?: string;
};

export async function InfoRegistrationPage({ heading = "Info" }: Props) {
  const {
    pendingFreePlayers,
    pendingTeams,
    acceptedFreePlayers,
    acceptedTeams,
    declinedFreePlayers,
    declinedTeams,
    error,
  } = await getRegistrationsForInfo();

  return (
    <main className="min-h-screen bg-[#030712] text-[#e5e7eb]">
      <Navbar />
      <div
        className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 lg:px-8"
        style={{ fontFamily: "'Bison Bold', sans-serif" }}
      >
        <h1 className="mb-3 text-center text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
          {heading}
        </h1>
        <p className="mb-12 text-center text-base text-white/70 sm:text-lg">
          Players libres y equipos anotados en Argentina Dota Masters S1
        </p>

        {error && (
          <div className="mb-10 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100">
            No se pudo cargar la lista: {error}. Revisá las variables de entorno,
            la tabla en Supabase y que hayas ejecutado la migración{" "}
            <code className="rounded bg-black/30 px-1">002_approval_status.sql</code> y{" "}
            <code className="rounded bg-black/30 px-1">003_free_player_profile.sql</code> y{" "}
            <code className="rounded bg-black/30 px-1">004_team_roster.sql</code>.
          </div>
        )}

        <section className="mb-14">
          <h2 className="mb-4 border-b border-amber-500/25 pb-3 text-xl font-black uppercase tracking-wide text-amber-200/90 sm:text-2xl">
            Solicitudes pendientes
          </h2>
          <p className="mb-6 text-sm text-white/55">
            Desde acá podés aceptar o declinar players libres y equipos.
          </p>
          <div className="grid gap-10 lg:grid-cols-2">
            <section>
              <h3 className="mb-4 text-lg font-black uppercase tracking-wide text-[#a78bfa]">
                Players libres en espera
              </h3>
              {pendingFreePlayers.length === 0 ? (
                <p className="text-sm text-white/50">
                  No hay players libres pendientes.
                </p>
              ) : (
                <ul className="space-y-4">
                  {pendingFreePlayers.map((p) => (
                    <PendingFreeApprovalCard key={p.id} registration={p} />
                  ))}
                </ul>
              )}
            </section>
            <section>
              <h3 className="mb-4 text-lg font-black uppercase tracking-wide text-[#38bdf8]">
                Equipos en espera
              </h3>
              {pendingTeams.length === 0 ? (
                <p className="text-sm text-white/50">
                  No hay equipos pendientes.
                </p>
              ) : (
                <ul className="space-y-4">
                  {pendingTeams.map((t) => (
                    <PendingTeamApprovalCard key={t.id} registration={t} />
                  ))}
                </ul>
              )}
            </section>
          </div>
        </section>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <section>
            <h2 className="mb-6 border-b border-white/15 pb-3 text-xl font-black uppercase tracking-wide text-[#a78bfa] sm:text-2xl">
              Players libres aceptados
            </h2>
            {acceptedFreePlayers.length === 0 ? (
              <p className="text-sm text-white/50">
                Todavía no hay players libres aprobados. Las nuevas solicitudes
                aparecen arriba para revisión.
              </p>
            ) : (
              <ul className="space-y-3">
                {acceptedFreePlayers.map((p) => (
                  <li
                    key={p.id}
                    className="border border-white/10 bg-[#0f172a]/80 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-lg font-bold text-white">
                        {p.full_name?.trim() ||
                          p.steam_or_contact ||
                          p.nickname ||
                          p.nick_steam ||
                          "—"}
                      </span>
                      <span className="text-xs text-white/45">
                        {formatDate(p.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/70">
                      <span className="text-white/45">Nickname: </span>
                      {p.nickname?.trim() || p.nick_steam || "—"}
                    </p>
                    <p className="mt-0.5 text-sm text-white/70">
                      <span className="text-white/45">Rol: </span>
                      {formatPlayerRoleLabel(p.player_role)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-6 border-b border-white/15 pb-3 text-xl font-black uppercase tracking-wide text-[#38bdf8] sm:text-2xl">
              Equipos aceptados
            </h2>
            {acceptedTeams.length === 0 ? (
              <p className="text-sm text-white/50">
                Todavía no hay equipos aceptados.
              </p>
            ) : (
              <ul className="space-y-3">
                {acceptedTeams.map((t) => {
                  const starters = parseTeamRosterJson(t.team_roster_players);
                  const subs = parseTeamRosterJson(t.team_roster_substitutes);
                  return (
                    <li
                      key={t.id}
                      className="border border-white/10 bg-[#0f172a]/80 px-4 py-3"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-lg font-bold uppercase tracking-wide text-white">
                          {t.team_name ?? "—"}{" "}
                          <span className="text-[#a78bfa]">
                            [{t.team_tag ?? "—"}]
                          </span>
                        </span>
                        <span className="text-xs text-white/45">
                          {formatDate(t.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-white/70">
                        <span className="text-white/45">Capitán / contacto: </span>
                        {t.captain_contact ?? "—"}
                      </p>
                      {starters && starters.length > 0 && (
                        <div className="mt-3 border-t border-white/10 pt-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                            Titulares
                          </p>
                          <ul className="mt-1 space-y-0.5 text-sm text-white/80">
                            {starters.map((p, i) => (
                              <li key={i}>
                                <span className="text-[#a78bfa]">
                                  {p.nickname || "—"}
                                </span>
                                {" — "}
                                {p.full_name || "—"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {subs && subs.length > 0 && (
                        <div className="mt-2 border-t border-white/10 pt-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                            Suplentes
                          </p>
                          <ul className="mt-1 space-y-0.5 text-sm text-white/70">
                            {subs.map((p, i) => (
                              <li key={i}>
                                <span className="text-[#38bdf8]/90">
                                  {p.nickname || "—"}
                                </span>
                                {" — "}
                                {p.full_name || "—"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <section>
            <h2 className="mb-2 border-b border-red-500/30 pb-3 text-xl font-black uppercase tracking-wide text-red-200 sm:text-2xl">
              Players libres rechazados
            </h2>
            <ClearDeclinedButton
              registrationType="free"
              label="Limpiar lista de rechazados"
              disabled={declinedFreePlayers.length === 0}
            />
            {declinedFreePlayers.length === 0 ? (
              <p className="mt-6 text-sm text-white/50">
                No hay players libres rechazados.
              </p>
            ) : (
              <ul className="mt-6 space-y-3">
                {declinedFreePlayers.map((p) => (
                  <li
                    key={p.id}
                    className="border border-red-500/30 bg-red-950/20 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-lg font-bold text-white">
                        {p.full_name?.trim() ||
                          p.steam_or_contact ||
                          p.nickname ||
                          p.nick_steam ||
                          "—"}
                      </span>
                      <span className="text-xs text-white/45">
                        {formatDate(p.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/70">
                      <span className="text-white/45">Nickname: </span>
                      {p.nickname?.trim() || p.nick_steam || "—"}
                    </p>
                    <p className="mt-0.5 text-sm text-white/70">
                      <span className="text-white/45">Rol: </span>
                      {formatPlayerRoleLabel(p.player_role)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-2 border-b border-red-500/30 pb-3 text-xl font-black uppercase tracking-wide text-red-200 sm:text-2xl">
              Equipos rechazados
            </h2>
            <ClearDeclinedButton
              registrationType="team"
              label="Limpiar lista de rechazados"
              disabled={declinedTeams.length === 0}
            />
            {declinedTeams.length === 0 ? (
              <p className="mt-6 text-sm text-white/50">No hay equipos rechazados.</p>
            ) : (
              <ul className="mt-6 space-y-3">
                {declinedTeams.map((t) => {
                  const starters = parseTeamRosterJson(t.team_roster_players);
                  const subs = parseTeamRosterJson(t.team_roster_substitutes);
                  return (
                    <li
                      key={t.id}
                      className="border border-red-500/30 bg-red-950/20 px-4 py-3"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-lg font-bold uppercase tracking-wide text-white">
                          {t.team_name ?? "—"}{" "}
                          <span className="text-[#a78bfa]">[{t.team_tag ?? "—"}]</span>
                        </span>
                        <span className="text-xs text-white/45">
                          {formatDate(t.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-white/70">
                        <span className="text-white/45">Capitán / contacto: </span>
                        {t.captain_contact ?? "—"}
                      </p>
                      {starters && starters.length > 0 && (
                        <div className="mt-3 border-t border-white/10 pt-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                            Titulares
                          </p>
                          <ul className="mt-1 space-y-0.5 text-sm text-white/80">
                            {starters.map((p, i) => (
                              <li key={i}>
                                <span className="text-[#a78bfa]">{p.nickname || "—"}</span>
                                {" — "}
                                {p.full_name || "—"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {subs && subs.length > 0 && (
                        <div className="mt-2 border-t border-white/10 pt-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                            Suplentes
                          </p>
                          <ul className="mt-1 space-y-0.5 text-sm text-white/70">
                            {subs.map((p, i) => (
                              <li key={i}>
                                <span className="text-[#38bdf8]/90">{p.nickname || "—"}</span>
                                {" — "}
                                {p.full_name || "—"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
