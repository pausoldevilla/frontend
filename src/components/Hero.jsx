import React from "react";

export default function Hero() {
  return (
    <section
      className="hero relative w-full h-screen flex items-start px-16 text-white"
      style={{
        backgroundImage: "url('/img/jardi.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0"></div>

      <div className="hero-content relative z-10 max-w-screen-md pt-40">
        <h2 className="text-5xl mb-4 font-bold drop-shadow-lg">
          Bienvenido
        </h2>
        <p className="text-xl mb-6 drop-shadow-md">
          Descubre las mejores plantas para tu hogar y jardín
        </p>
        <a
          href="#categories"
          className="font-bold border-b border-white hover:text-green-900 transition-colors drop-shadow-sm"
        >
          Explorar Categorías
        </a>
      </div>
    </section>
  );
}
