import React from "react";

export default function Hero() {
  return (
    <section
      className="hero relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/img/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Hero Content */}
      <div className="hero-content relative z-10 flex flex-col items-center text-center max-w-4xl px-6 w-full translate-y-24 md:translate-y-32">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight drop-shadow-2xl mb-4">
          Naturaleza con propósito
        </h1>
        <p className="text-base md:text-xl font-normal leading-relaxed drop-shadow-xl opacity-90">
          Tus elecciones construyen un entorno más sostenible
        </p>
      </div>
    </section>
  );
}
