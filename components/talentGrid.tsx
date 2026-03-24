import TalentCard, { TalentData } from "@/components/talentCard";

const STREAMER_IMAGE = "/images/streamer/streamer1.jpg";

const TALENT: TalentData[] = [
  { id: "crystalmay", name: "CRYSTALMAY", image: STREAMER_IMAGE },
  { id: "4ce", name: "4CE", image: STREAMER_IMAGE },
  { id: "4liver", name: "4LIVER", image: STREAMER_IMAGE },
  { id: "9pasha", name: "9PASHA", image: STREAMER_IMAGE },
  { id: "adekvat", name: "ADEKVAT", image: STREAMER_IMAGE },
  { id: "ars-art", name: "ARS-ART", image: STREAMER_IMAGE },
  { id: "artstyle", name: "ARTSTYLE", image: STREAMER_IMAGE },
  { id: "b0rbe1", name: "B0RBE1", image: STREAMER_IMAGE },
  { id: "bafik", name: "BAFIK", image: STREAMER_IMAGE },
  { id: "belony", name: "BELONY", image: STREAMER_IMAGE },
  { id: "dendi", name: "DENDI", image: STREAMER_IMAGE },
  { id: "dkphobos", name: "DKPHOBOS", image: STREAMER_IMAGE },
  { id: "eiritel", name: "EIRITEL", image: STREAMER_IMAGE },
  { id: "goblak", name: "GOBLAK", image: STREAMER_IMAGE },
];

export default function TalentGrid() {
  return (
    <section
      id="streamers"
      className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#030712] px-4 pb-12 pt-10"
      style={{ fontFamily: "'Bison Bold', sans-serif" }}
      aria-label="RU Broadcast Talent"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#020617]/60 to-black/90" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[52vh] w-[72vw] -translate-x-1/2 opacity-45"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(204, 0, 255, 0.4) 0%, rgba(0, 231, 255, 0.28) 32%, rgba(2, 6, 23, 0.08) 62%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-1/2 top-14 z-0 h-[26vh] w-[56vw] -translate-x-1/2 opacity-45"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(204, 0, 255, 0.32) 0%, rgba(0, 231, 255, 0.24) 45%, transparent 76%)",
          filter: "blur(14px)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.04 0.003 60 / 0.85) 100%)",
        }}
        aria-hidden="true"
      />

      <header className="relative z-10 mb-10 text-center">
        <h2
          className="text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontFamily: "'Bison Bold', sans-serif" }}
        >
          <span className="text-lg text-white sm:text-xl lg:text-2xl xl:text-3xl">
            Argentina Dota Masters
          </span>
          <br />
          <span
            className="bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] bg-clip-text text-transparent"
            style={{
              filter:
                "drop-shadow(0 0 12px rgba(204, 0, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 231, 255, 0.4))",
            }}
          >
            RU Broadcast Talent
          </span>
        </h2>
      </header>

      <div className="relative z-10 w-full max-w-5xl">
        <ul
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          aria-label="Talent roster"
        >
          {TALENT.map((t) => (
            <li key={t.id}>
              <TalentCard talent={t} />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[32vh] w-[68vw] -translate-x-1/2 opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(204, 0, 255, 0.34) 0%, rgba(0, 231, 255, 0.24) 36%, transparent 78%)",
          filter: "blur(14px)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
