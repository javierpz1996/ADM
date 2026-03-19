import { CountdownTimer } from "@/components/countdown-timer";
import { RegisterButton } from "@/components/register-button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 pb-16"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/fondo-hero-test-1.jpg)" }}
        aria-hidden
      />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#020617]/60 to-black/90" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#896afd]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#896afd]/15 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
        {/* Main Title */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-balance" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
          <span className="text-foreground text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-white">Una nueva ERA</span>
          <br />
          <span
            className="bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 12px rgba(204, 0, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 231, 255, 0.4))",
            }}
          >
            Argentina Dota Masters S1
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white max-w-md mx-auto text-pretty">
        Un escenario donde los equipos buscan demostrar su verdadero nivel y lucharán por dejar su huella en la historia
        </p>

        {/* Línea separadora */}
        <div className="w-20 h-1.5 bg-white/70 rounded-none mx-auto shrink-0" aria-hidden />

        <CountdownTimer daysFromNow={30} />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <RegisterButton />
        </div>
      </div>
    </section>
  );
}
