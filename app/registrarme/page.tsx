"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect, useCallback, type FormEvent } from "react";
import { toast } from "sonner";
import type { RegistrationRow } from "@/lib/registrations";
import {
  formatConfirmationDateTime,
  playerDisplayParts,
  teamColumnText,
  rosterStatusText,
} from "@/lib/recent-confirmations-display";
import type { PlayerRole } from "@/lib/player-roles";
import { PLAYER_ROLE_VALUES, PLAYER_ROLE_LABELS } from "@/lib/player-roles";
import {
  TEAM_STARTERS_COUNT,
  emptyRosterMember,
  type TeamRosterMember,
} from "@/lib/team-roster";

type RegisterType = "free" | "team";

function initialStarters(): TeamRosterMember[] {
  return Array.from({ length: TEAM_STARTERS_COUNT }, () => emptyRosterMember());
}

export default function RegistrarmePage() {
  const [registerType, setRegisterType] = useState<RegisterType>("free");
  const [nickname, setNickname] = useState("");
  const [fullName, setFullName] = useState("");
  const [playerRole, setPlayerRole] = useState<PlayerRole>("carry");
  const [dotabuffLink, setDotabuffLink] = useState("");
  const [steamId, setSteamId] = useState("");
  const [dotaId, setDotaId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [captainContact, setCaptainContact] = useState("");
  const [teamStarters, setTeamStarters] =
    useState<TeamRosterMember[]>(initialStarters);
  const [teamSubs, setTeamSubs] = useState<TeamRosterMember[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [recentRows, setRecentRows] = useState<RegistrationRow[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentError, setRecentError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const baseFieldClass =
    "w-full bg-[#0b0b0b] px-3 py-2 text-sm text-[#e0e0e0] placeholder:text-[#666666] focus:outline-none";

  function getFieldClass(field: string) {
    return `${baseFieldClass} ${
      fieldErrors[field]
        ? "border border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-500/70"
        : "border border-[#555555] focus:border-[#777777] focus:ring-1 focus:ring-[#555555]"
    }`;
  }

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function isValidUrl(value: string) {
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  function validateForm() {
    const errors: Record<string, string> = {};

    if (registerType === "free") {
      if (!nickname.trim()) errors.nickname = "El nickname es obligatorio.";
      if (!fullName.trim())
        errors.full_name = "El nombre y apellido es obligatorio.";
      if (!playerRole.trim()) errors.player_role = "Seleccioná un rol.";
      if (!dotabuffLink.trim()) {
        errors.dotabuff_link = "El link de Dotabuff es obligatorio.";
      } else if (!isValidUrl(dotabuffLink.trim())) {
        errors.dotabuff_link = "Ingresá una URL válida (http/https).";
      }
      if (!steamId.trim()) errors.steam_id = "El Steam ID es obligatorio.";
      if (!dotaId.trim()) errors.dota_id = "El Dota ID es obligatorio.";
      return errors;
    }

    if (!teamName.trim()) errors.team_name = "El nombre del equipo es obligatorio.";
    if (!teamTag.trim()) errors.team_tag = "El tag es obligatorio.";
    if (!captainContact.trim())
      errors.captain_contact = "El contacto del capitán es obligatorio.";

    teamStarters.forEach((p, idx) => {
      const prefix = `starter_${idx}`;
      if (!p.nickname.trim())
        errors[`${prefix}_nickname`] = "Nickname obligatorio.";
      if (!p.full_name.trim())
        errors[`${prefix}_full_name`] = "Nombre y apellido obligatorio.";
      if (!p.player_role.trim())
        errors[`${prefix}_player_role`] = "Rol obligatorio.";
      if (!p.dotabuff_link.trim()) {
        errors[`${prefix}_dotabuff_link`] = "Dotabuff obligatorio.";
      } else if (!isValidUrl(p.dotabuff_link.trim())) {
        errors[`${prefix}_dotabuff_link`] = "URL inválida.";
      }
      if (!p.steam_id.trim())
        errors[`${prefix}_steam_id`] = "Steam ID obligatorio.";
      if (!p.dota_id.trim()) errors[`${prefix}_dota_id`] = "Dota ID obligatorio.";
    });

    teamSubs.forEach((p, idx) => {
      const hasAny =
        p.nickname.trim() ||
        p.full_name.trim() ||
        p.player_role.trim() ||
        p.dotabuff_link.trim() ||
        p.steam_id.trim() ||
        p.dota_id.trim();
      if (!hasAny) return;
      const prefix = `sub_${idx}`;
      if (!p.nickname.trim())
        errors[`${prefix}_nickname`] = "Completá nickname o quitá el suplente.";
      if (!p.full_name.trim())
        errors[`${prefix}_full_name`] = "Completá nombre o quitá el suplente.";
      if (!p.player_role.trim())
        errors[`${prefix}_player_role`] = "Completá rol o quitá el suplente.";
      if (!p.dotabuff_link.trim()) {
        errors[`${prefix}_dotabuff_link`] = "Completá Dotabuff o quitá el suplente.";
      } else if (!isValidUrl(p.dotabuff_link.trim())) {
        errors[`${prefix}_dotabuff_link`] = "URL inválida.";
      }
      if (!p.steam_id.trim())
        errors[`${prefix}_steam_id`] = "Completá Steam ID o quitá el suplente.";
      if (!p.dota_id.trim())
        errors[`${prefix}_dota_id`] = "Completá Dota ID o quitá el suplente.";
    });

    return errors;
  }

  const loadRecentConfirmations = useCallback(async () => {
    setRecentLoading(true);
    setRecentError(null);
    try {
      const res = await fetch("/api/registrations");
      const json = (await res.json()) as {
        data?: RegistrationRow[];
        error?: string;
      };
      if (!res.ok) {
        setRecentError(json.error ?? "No se pudo cargar la lista.");
        setRecentRows([]);
        return;
      }
      setRecentRows(json.data ?? []);
    } catch {
      setRecentError("Error de red al cargar confirmaciones.");
      setRecentRows([]);
    } finally {
      setRecentLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecentConfirmations();
  }, [loadRecentConfirmations]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Revisá los campos marcados en rojo.");
      return;
    }
    setFieldErrors({});
    setSubmitting(true);
    try {
      const body =
        registerType === "free"
          ? {
              registration_type: "free" as const,
              nickname,
              full_name: fullName,
              player_role: playerRole,
              dotabuff_link: dotabuffLink,
              steam_id: steamId,
              dota_id: dotaId,
            }
          : {
              registration_type: "team" as const,
              team_name: teamName,
              team_tag: teamTag,
              captain_contact: captainContact,
              roster_players: teamStarters,
              roster_substitutes: teamSubs.filter(
                (s) =>
                  s.nickname.trim().length > 0 &&
                  s.full_name.trim().length > 0 &&
                  s.player_role.trim().length > 0 &&
                  s.dotabuff_link.trim().length > 0 &&
                  s.steam_id.trim().length > 0 &&
                  s.dota_id.trim().length > 0
              ),
            };

      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await res.json()) as { error?: string; ok?: boolean };

      if (!res.ok) {
        throw new Error(data.error || "No se pudo enviar el registro.");
      }

      toast.success("Registro guardado correctamente.");
      if (registerType === "free") {
        setNickname("");
        setFullName("");
        setPlayerRole("carry");
        setDotabuffLink("");
        setSteamId("");
        setDotaId("");
      } else {
        setTeamName("");
        setTeamTag("");
        setCaptainContact("");
        setTeamStarters(initialStarters());
        setTeamSubs([]);
      }
      void loadRecentConfirmations();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Error al enviar el formulario.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#999999]">
      <Navbar />
      <div
        className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:pt-28 lg:pt-32 sm:px-6 lg:px-8"
        style={{
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Arial, Helvetica, sans-serif",
        }}
      >
        <div className="mb-10 space-y-3 text-center sm:mb-12 sm:space-y-4">
          <h1 className="text-2xl font-normal uppercase tracking-wide text-[#b3b3b3] sm:text-3xl md:text-4xl">
            Argentina Dota Masters S1 — Registro
          </h1>
          <p className="text-sm leading-relaxed text-[#aaaaaa] sm:text-[0.95rem]">
            Elegí cómo querés registrarte en el torneo. Solo podés inscribirte como{" "}
            <span className="text-[#cccccc]">player libre</span> o{" "}
            <span className="text-[#cccccc]">equipo</span>.
          </p>
        </div>

        {/* Única elección: jugador libre o equipo */}
        <fieldset className="mb-10 border border-[#333333] bg-[#0d0d0d] p-6 sm:p-8">
          <legend className="px-2 text-sm font-medium uppercase tracking-wide text-[#b3b3b3]">
            Tipo de registro
          </legend>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <label className="flex cursor-pointer items-start gap-3 sm:flex-1">
              <input
                type="radio"
                name="registerType"
                checked={registerType === "free"}
                onChange={() => setRegisterType("free")}
                className="mt-1 h-4 w-4 shrink-0 border-[#666666] bg-[#1a1a1a] text-[#4a90e2] focus:ring-[#4a90e2]"
              />
              <span>
                <span className="block text-base font-semibold text-white">
                  Registrar player libre
                </span>
                <span className="mt-1 block text-sm text-[#888888]">
                  Inscribite sin equipo; podés ser reclutado después por un
                  plantel.
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 sm:flex-1">
              <input
                type="radio"
                name="registerType"
                checked={registerType === "team"}
                onChange={() => setRegisterType("team")}
                className="mt-1 h-4 w-4 shrink-0 border-[#666666] bg-[#1a1a1a] text-[#4a90e2] focus:ring-[#4a90e2]"
              />
              <span>
                <span className="block text-base font-semibold text-white">
                  Registrar equipo
                </span>
                <span className="mt-1 block text-sm text-[#888888]">
                  Inscribí a tu escuadra completa para competir en el torneo.
                </span>
              </span>
            </label>
          </div>
        </fieldset>

        {/* Formulario según elección */}
        <form
          className="border border-[#333333] bg-[#121212] p-6 sm:p-8"
          onSubmit={handleSubmit}
        >
          {registerType === "free" ? (
            <div className="space-y-5">
              <h2 className="text-sm font-normal uppercase tracking-wide text-[#b3b3b3]">
                Datos del player libre
              </h2>
              <p className="text-sm text-[#888888]">
                Completá todos los campos. La solicitud queda pendiente hasta
                aprobación en Info.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nickname"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Nickname
                  </label>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      clearFieldError("nickname");
                    }}
                    autoComplete="username"
                    className={getFieldClass("nickname")}
                    placeholder="Nickname in-game"
                    disabled={submitting}
                  />
                  {fieldErrors.nickname && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.nickname}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="full_name"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Nombre y apellido
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      clearFieldError("full_name");
                    }}
                    autoComplete="name"
                    className={getFieldClass("full_name")}
                    placeholder="Como figura en el documento"
                    disabled={submitting}
                  />
                  {fieldErrors.full_name && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.full_name}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="player_role"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Rol preferido
                  </label>
                  <select
                    id="player_role"
                    name="player_role"
                    value={playerRole}
                    onChange={(e) =>
                      {
                        setPlayerRole(e.target.value as PlayerRole);
                        clearFieldError("player_role");
                      }
                    }
                    className={getFieldClass("player_role")}
                    disabled={submitting}
                  >
                    {PLAYER_ROLE_VALUES.map((r) => (
                      <option key={r} value={r}>
                        {PLAYER_ROLE_LABELS[r]}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.player_role && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.player_role}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="dotabuff_link"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Link de Dotabuff
                  </label>
                  <input
                    id="dotabuff_link"
                    name="dotabuff_link"
                    type="url"
                    value={dotabuffLink}
                    onChange={(e) => {
                      setDotabuffLink(e.target.value);
                      clearFieldError("dotabuff_link");
                    }}
                    className={getFieldClass("dotabuff_link")}
                    placeholder="https://www.dotabuff.com/..."
                    disabled={submitting}
                  />
                  {fieldErrors.dotabuff_link && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.dotabuff_link}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="steam_id"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Steam ID
                  </label>
                  <input
                    id="steam_id"
                    name="steam_id"
                    type="text"
                    value={steamId}
                    onChange={(e) => {
                      setSteamId(e.target.value);
                      clearFieldError("steam_id");
                    }}
                    className={getFieldClass("steam_id")}
                    placeholder="Steam ID64 o perfil"
                    disabled={submitting}
                  />
                  {fieldErrors.steam_id && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.steam_id}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="dota_id"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Dota ID
                  </label>
                  <input
                    id="dota_id"
                    name="dota_id"
                    type="text"
                    value={dotaId}
                    onChange={(e) => {
                      setDotaId(e.target.value);
                      clearFieldError("dota_id");
                    }}
                    className={getFieldClass("dota_id")}
                    placeholder="ID de Dota 2"
                    disabled={submitting}
                  />
                  {fieldErrors.dota_id && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.dota_id}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-sm font-normal uppercase tracking-wide text-[#b3b3b3]">
                Datos del equipo
              </h2>
              <p className="text-sm text-[#888888]">
                Nombre del equipo, tag, contacto del capitán y{" "}
                <span className="text-[#cccccc]">5 jugadores titulares</span>{" "}
                obligatorios. Los suplentes son opcionales.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="team_name"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Nombre del equipo
                  </label>
                  <input
                    id="team_name"
                    name="team_name"
                    type="text"
                    value={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
                      clearFieldError("team_name");
                    }}
                    className={getFieldClass("team_name")}
                    placeholder="Nombre oficial"
                    disabled={submitting}
                  />
                  {fieldErrors.team_name && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.team_name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="team_tag"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Tag
                  </label>
                  <input
                    id="team_tag"
                    name="team_tag"
                    type="text"
                    value={teamTag}
                    onChange={(e) => {
                      setTeamTag(e.target.value);
                      clearFieldError("team_tag");
                    }}
                    className={getFieldClass("team_tag")}
                    placeholder="TAG"
                    disabled={submitting}
                  />
                  {fieldErrors.team_tag && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.team_tag}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="captain_contact"
                    className="mb-1 block text-xs uppercase text-[#888888]"
                  >
                    Capitán / contacto
                  </label>
                  <input
                    id="captain_contact"
                    name="captain_contact"
                    type="text"
                    value={captainContact}
                    onChange={(e) => {
                      setCaptainContact(e.target.value);
                      clearFieldError("captain_contact");
                    }}
                    className={getFieldClass("captain_contact")}
                    placeholder="Nick o email del capitán"
                    disabled={submitting}
                  />
                  {fieldErrors.captain_contact && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.captain_contact}</p>
                  )}
                </div>
              </div>

              <div className="border-t border-[#333333] pt-5">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#b3b3b3]">
                  Titulares ({TEAM_STARTERS_COUNT}) — obligatorio
                </h3>
                <div className="space-y-4">
                  {teamStarters.map((p, idx) => (
                    <div
                      key={`starter-${idx}`}
                      className="grid gap-3 rounded border border-[#333333] bg-[#0b0b0b]/50 p-3 sm:grid-cols-2"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] sm:col-span-2">
                        Jugador {idx + 1}
                      </span>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                          Nickname
                        </label>
                        <input
                          type="text"
                          value={p.nickname}
                          onChange={(e) => {
                            const v = e.target.value;
                            setTeamStarters((prev) => {
                              const n = [...prev];
                              n[idx] = { ...n[idx], nickname: v };
                              return n;
                            });
                            clearFieldError(`starter_${idx}_nickname`);
                          }}
                          className={getFieldClass(`starter_${idx}_nickname`)}
                          placeholder="Nickname"
                          disabled={submitting}
                        />
                        {fieldErrors[`starter_${idx}_nickname`] && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors[`starter_${idx}_nickname`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                          Nombre y apellido
                        </label>
                        <input
                          type="text"
                          value={p.full_name}
                          onChange={(e) => {
                            const v = e.target.value;
                            setTeamStarters((prev) => {
                              const n = [...prev];
                              n[idx] = { ...n[idx], full_name: v };
                              return n;
                            });
                            clearFieldError(`starter_${idx}_full_name`);
                          }}
                          className={getFieldClass(`starter_${idx}_full_name`)}
                          placeholder="Nombre completo"
                          disabled={submitting}
                        />
                        {fieldErrors[`starter_${idx}_full_name`] && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors[`starter_${idx}_full_name`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                          Rol preferido
                        </label>
                        <select
                          value={p.player_role}
                          onChange={(e) => {
                            const v = e.target.value as PlayerRole;
                            setTeamStarters((prev) => {
                              const n = [...prev];
                              n[idx] = { ...n[idx], player_role: v };
                              return n;
                            });
                            clearFieldError(`starter_${idx}_player_role`);
                          }}
                          className={getFieldClass(`starter_${idx}_player_role`)}
                          disabled={submitting}
                        >
                          {PLAYER_ROLE_VALUES.map((r) => (
                            <option key={r} value={r}>
                              {PLAYER_ROLE_LABELS[r]}
                            </option>
                          ))}
                        </select>
                        {fieldErrors[`starter_${idx}_player_role`] && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors[`starter_${idx}_player_role`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                          Link de Dotabuff
                        </label>
                        <input
                          type="url"
                          value={p.dotabuff_link}
                          onChange={(e) => {
                            const v = e.target.value;
                            setTeamStarters((prev) => {
                              const n = [...prev];
                              n[idx] = { ...n[idx], dotabuff_link: v };
                              return n;
                            });
                            clearFieldError(`starter_${idx}_dotabuff_link`);
                          }}
                          className={getFieldClass(`starter_${idx}_dotabuff_link`)}
                          placeholder="https://www.dotabuff.com/..."
                          disabled={submitting}
                        />
                        {fieldErrors[`starter_${idx}_dotabuff_link`] && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors[`starter_${idx}_dotabuff_link`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                          Steam ID
                        </label>
                        <input
                          type="text"
                          value={p.steam_id}
                          onChange={(e) => {
                            const v = e.target.value;
                            setTeamStarters((prev) => {
                              const n = [...prev];
                              n[idx] = { ...n[idx], steam_id: v };
                              return n;
                            });
                            clearFieldError(`starter_${idx}_steam_id`);
                          }}
                          className={getFieldClass(`starter_${idx}_steam_id`)}
                          placeholder="Steam ID64 o perfil"
                          disabled={submitting}
                        />
                        {fieldErrors[`starter_${idx}_steam_id`] && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors[`starter_${idx}_steam_id`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                          Dota ID
                        </label>
                        <input
                          type="text"
                          value={p.dota_id}
                          onChange={(e) => {
                            const v = e.target.value;
                            setTeamStarters((prev) => {
                              const n = [...prev];
                              n[idx] = { ...n[idx], dota_id: v };
                              return n;
                            });
                            clearFieldError(`starter_${idx}_dota_id`);
                          }}
                          className={getFieldClass(`starter_${idx}_dota_id`)}
                          placeholder="Dota ID"
                          disabled={submitting}
                        />
                        {fieldErrors[`starter_${idx}_dota_id`] && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors[`starter_${idx}_dota_id`]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#333333] pt-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
                    Suplentes (opcional)
                  </h3>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() =>
                      setTeamSubs((s) => [...s, emptyRosterMember()])
                    }
                    className="border border-[#555555] bg-[#1a1a1a] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#6ba3e8] hover:bg-[#252525]"
                  >
                    + Agregar suplente
                  </button>
                </div>
                {teamSubs.length === 0 ? (
                  <p className="text-xs text-[#666666]">
                    No agregaste suplentes. Podés sumar filas cuando quieras.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {teamSubs.map((p, idx) => (
                      <div
                        key={`sub-${idx}`}
                        className="grid gap-3 rounded border border-[#444] bg-[#0b0b0b]/30 p-3 sm:grid-cols-2"
                      >
                        <div>
                          <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                            Nickname
                          </label>
                          <input
                            type="text"
                            value={p.nickname}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTeamSubs((prev) => {
                                const n = [...prev];
                                n[idx] = { ...n[idx], nickname: v };
                                return n;
                              });
                              clearFieldError(`sub_${idx}_nickname`);
                            }}
                            className={getFieldClass(`sub_${idx}_nickname`)}
                            disabled={submitting}
                          />
                          {fieldErrors[`sub_${idx}_nickname`] && (
                            <p className="mt-1 text-xs text-red-400">
                              {fieldErrors[`sub_${idx}_nickname`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                            Nombre y apellido
                          </label>
                          <input
                            type="text"
                            value={p.full_name}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTeamSubs((prev) => {
                                const n = [...prev];
                                n[idx] = { ...n[idx], full_name: v };
                                return n;
                              });
                              clearFieldError(`sub_${idx}_full_name`);
                            }}
                            className={getFieldClass(`sub_${idx}_full_name`)}
                            disabled={submitting}
                          />
                          {fieldErrors[`sub_${idx}_full_name`] && (
                            <p className="mt-1 text-xs text-red-400">
                              {fieldErrors[`sub_${idx}_full_name`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                            Rol preferido
                          </label>
                          <select
                            value={p.player_role}
                            onChange={(e) => {
                              const v = e.target.value as PlayerRole;
                              setTeamSubs((prev) => {
                                const n = [...prev];
                                n[idx] = { ...n[idx], player_role: v };
                                return n;
                              });
                              clearFieldError(`sub_${idx}_player_role`);
                            }}
                            className={getFieldClass(`sub_${idx}_player_role`)}
                            disabled={submitting}
                          >
                            {PLAYER_ROLE_VALUES.map((r) => (
                              <option key={r} value={r}>
                                {PLAYER_ROLE_LABELS[r]}
                              </option>
                            ))}
                          </select>
                          {fieldErrors[`sub_${idx}_player_role`] && (
                            <p className="mt-1 text-xs text-red-400">
                              {fieldErrors[`sub_${idx}_player_role`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                            Link de Dotabuff
                          </label>
                          <input
                            type="url"
                            value={p.dotabuff_link}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTeamSubs((prev) => {
                                const n = [...prev];
                                n[idx] = { ...n[idx], dotabuff_link: v };
                                return n;
                              });
                              clearFieldError(`sub_${idx}_dotabuff_link`);
                            }}
                            className={getFieldClass(`sub_${idx}_dotabuff_link`)}
                            placeholder="https://www.dotabuff.com/..."
                            disabled={submitting}
                          />
                          {fieldErrors[`sub_${idx}_dotabuff_link`] && (
                            <p className="mt-1 text-xs text-red-400">
                              {fieldErrors[`sub_${idx}_dotabuff_link`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                            Steam ID
                          </label>
                          <input
                            type="text"
                            value={p.steam_id}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTeamSubs((prev) => {
                                const n = [...prev];
                                n[idx] = { ...n[idx], steam_id: v };
                                return n;
                              });
                              clearFieldError(`sub_${idx}_steam_id`);
                            }}
                            className={getFieldClass(`sub_${idx}_steam_id`)}
                            placeholder="Steam ID64 o perfil"
                            disabled={submitting}
                          />
                          {fieldErrors[`sub_${idx}_steam_id`] && (
                            <p className="mt-1 text-xs text-red-400">
                              {fieldErrors[`sub_${idx}_steam_id`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] uppercase text-[#888888]">
                            Dota ID
                          </label>
                          <input
                            type="text"
                            value={p.dota_id}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTeamSubs((prev) => {
                                const n = [...prev];
                                n[idx] = { ...n[idx], dota_id: v };
                                return n;
                              });
                              clearFieldError(`sub_${idx}_dota_id`);
                            }}
                            className={getFieldClass(`sub_${idx}_dota_id`)}
                            placeholder="Dota ID"
                            disabled={submitting}
                          />
                          {fieldErrors[`sub_${idx}_dota_id`] && (
                            <p className="mt-1 text-xs text-red-400">
                              {fieldErrors[`sub_${idx}_dota_id`]}
                            </p>
                          )}
                        </div>
                        <div className="flex items-end sm:col-span-2 sm:pb-0">
                          <button
                            type="button"
                            disabled={submitting}
                            onClick={() =>
                              setTeamSubs((prev) =>
                                prev.filter((_, i) => i !== idx)
                              )
                            }
                            className="w-full border border-red-900/60 bg-red-950/30 px-2 py-2 text-xs uppercase text-red-300 hover:bg-red-950/50 sm:w-auto"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end border-t border-[#333333] pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="border border-[#4a90e2] bg-[#4a90e2]/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#6ba3e8] transition-colors hover:bg-[#4a90e2]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Enviando…" : "Enviar registro"}
            </button>
          </div>
        </form>

        <hr className="my-12 border-[#333333]" />

        <section>
          <h2 className="mb-6 text-sm font-normal uppercase tracking-wide text-[#b3b3b3]">
            MOST RECENT NOTABLE CONFIRMATIONS:
          </h2>

          {recentError && (
            <p className="mb-4 text-sm text-amber-500/90">{recentError}</p>
          )}

          <div className="overflow-x-auto border border-[#333333] bg-[#0d0d0d]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#333333] bg-[#111111]">
                  <th className="px-4 py-3 font-normal text-[#888888]">Date</th>
                  <th className="px-4 py-3 font-normal text-[#888888]">Time</th>
                  <th className="px-4 py-3 font-normal text-[#888888]">Player</th>
                  <th className="px-4 py-3 font-normal text-[#888888]">Team</th>
                  <th className="px-4 py-3 font-normal text-[#888888]">
                    Roster Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-[#888888]"
                    >
                      Cargando…
                    </td>
                  </tr>
                ) : recentRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-[#888888]"
                    >
                      Todavía no hay registros recientes.
                    </td>
                  </tr>
                ) : (
                  recentRows.map((row) => {
                    const { dateStr, timeStr } = formatConfirmationDateTime(
                      row.created_at
                    );
                    const { gold, grey } = playerDisplayParts(row);
                    const teamText = teamColumnText(row);
                    const roster = rosterStatusText(row);
                    const isFree = row.registration_type === "free";

                    return (
                      <tr
                        key={row.id}
                        className="border-b border-[#2a2a2a] last:border-b-0"
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-[#cccccc]">
                          {dateStr}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#cccccc]">
                          {timeStr}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="font-medium"
                            style={{ color: "#d4a017" }}
                          >
                            {gold}
                          </span>
                          {grey ? (
                            <span className="text-[#888888]">
                              {" "}
                              ({grey})
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-[#cccccc]">
                          {isFree ? (
                            <span className="font-medium uppercase text-[#cccccc]">
                              LIBRE
                            </span>
                          ) : (
                            teamText
                          )}
                        </td>
                        <td className="px-4 py-3 text-[#aaaaaa]">{roster}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
