import React from "react";

export default function Hero() {
  return (
    <section
      className="hero relative w-full h-screen flex items-center px-16 text-white"
      style={{
        backgroundImage: "url('/img/jardi.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content relative z-10 max-w-screen-md">
        <h2 className="text-4xl mb-4 font-bold">Bienvenido</h2>
        <p className="text-lg mb-6">Descubre las mejores plantas para tu hogar y jardín</p>
        <a
          href="#categories"
          className="font-bold border-b border-white hover:text-green-500 transition-colors"
        >
          Explorar Categorías
        </a>
      </div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black/60 to-transparent"></div>
    </section>
  );
}
