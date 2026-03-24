"use client";

export function MerchSection() {
  return (
    <section
      id="merch"
      className="relative overflow-hidden py-28 sm:py-32 md:py-40 min-h-[360px] sm:min-h-[420px] flex flex-col justify-center"
    >
      {/* Fondo: merch-fondo-2.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/merch-fondo-2.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/60 to-[#030712]/80" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Título principal */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#896afd] via-[#a78bfa] to-[#896afd] drop-shadow-[0_0_25px_rgba(137,106,253,0.6)] mb-8">
          COMPRA LA MERCH Y HAZ CRECER EL PRIZE POOL
        </h2>

        {/* Texto descriptivo */}
        <div className="space-y-5 text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          <p>
            No solo te llevas la merch oficial del torneo, también ayudas a hacerlo más grande.
          </p>
          <p>
            Por cada camiseta o casaca que compres, una parte de tu compra se suma directamente al prize pool, apoyando a los jugadores y elevando la competencia.
          </p>
          <p className="text-[#a78bfa] font-semibold text-lg sm:text-xl">
            Vestí con estilo, apoyá al torneo y sé parte de la historia.
          </p>
        </div>
      </div>
    </section>
  );
}
