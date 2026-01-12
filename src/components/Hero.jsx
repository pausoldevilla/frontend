import React from "react";

export default function Hero() {
  return (
    <section
      className="hero relative w-full h-screen flex items-start px-16 text-white"
      style={{
        backgroundImage: "url('/img/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content relative z-10 max-w-screen-md pt-24 lg:pt-40 space-y-4 bg-black/90 p-4">
        <h2 className="text-5xl font-bold">Bienvenido</h2>

        <p className="text-xl">
          Descubre las mejores plantas para tu hogar y jardín
        </p>

        <a
          href="#categories"
          className="font-bold hover:underline transition-all"
        >
          Explorar Categorías
        </a>
      </div>
    </section>
  );
}
