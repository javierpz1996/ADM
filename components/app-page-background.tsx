import { BackgroundFallingParticles } from "@/components/background-falling-particles";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Fondo continuo: mismo navy oscuro de arriba a abajo (sin franja negra inferior).
 */
export function AppPageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 min-h-[100dvh] w-full overflow-x-hidden"
      aria-hidden
    >
      {/* Base: solo tonos navy; el inferior sigue la misma familia que el superior (sin #000 al 100%) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #020408 0%, #03060c 10%, #0a1525 45%, #071018 78%, #060d14 100%)",
        }}
      />

      {/* Refuerzo de franja central (bokeh) */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 120% 45% at 50% 50%, rgba(25, 65, 120, 0.35) 0%, transparent 65%)",
        }}
      />

      {/* Viñeta solo arriba (evita segunda “banda” en la parte inferior) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 28%)",
        }}
      />

      {/* Bruma / humo muy suave */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 48%, rgba(40, 90, 150, 0.12) 0%, transparent 55%)",
        }}
      />

      {/* Grano cinematográfico */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-soft-light"
        style={{
          backgroundImage: NOISE,
          backgroundSize: "140px 140px",
        }}
      />

      <BackgroundFallingParticles />
    </div>
  );
}
