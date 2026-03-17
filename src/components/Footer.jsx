import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">

      {/* Main grid: logo + 3 columns */}
      <div className="container mx-auto px-6 py-10">

        {/* Logo centrado en mobile, a la izquierda en desktop */}
        <div className="flex justify-center md:justify-start mb-10 md:mb-0">
          <Link to="/" className="flex flex-col items-center text-black no-underline">
            <img src="/img/logo.png" className="w-12 h-12" alt="Logo Soldevilla" />
            <span className="uppercase tracking-[0.3em] text-sm mt-2 font-serif font-bold text-black">
              soldevilla
            </span>
          </Link>
        </div>

        {/* Grid de columnas: en mobile 2 columnas, en desktop 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-0 md:mt-[-5.5rem]">

          {/* Columna vacía para desktop (ocupa el espacio del logo) */}
          <div className="hidden md:block" />

          {/* Enlaces */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-5">
              Enlaces
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-xs uppercase tracking-widest font-light text-gray-700 hover:text-black transition-colors">Inicio</Link></li>
              <li><Link to="/acerca" className="text-xs uppercase tracking-widest font-light text-gray-700 hover:text-black transition-colors">Acerca</Link></li>
              <li><Link to="/contacto" className="text-xs uppercase tracking-widest font-light text-gray-700 hover:text-black transition-colors">Contacto</Link></li>
              <li><Link to="/paisajismo" className="text-xs uppercase tracking-widest font-light text-gray-700 hover:text-black transition-colors">Paisajismo</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-5">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-xs uppercase tracking-widest font-light text-gray-600">info.soldevilla@gmail.com</li>
              <li className="text-xs uppercase tracking-widest font-light text-gray-600">+34 900 123 456</li>
              <li className="text-xs uppercase tracking-widest font-light text-gray-600">Girona 208, Sabadell</li>
              <li className="text-xs uppercase tracking-widest font-light text-gray-600">Lu-Vi 10-20h | Sa 11-15h</li>
            </ul>
          </div>

          {/* Newsletter — ocupa 2 cols en mobile */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-5">
              Newsletter
            </h3>
            <p className="text-xs uppercase tracking-widest font-light text-gray-500 mb-5 leading-relaxed">
              Suscríbete para recibir novedades y colecciones.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-transparent border-b border-gray-300 py-2 text-[10px] uppercase tracking-[0.2em] font-light text-gray-900 placeholder-gray-400 focus:border-black outline-none transition-colors"
              />
              <button
                type="submit"
                className="text-[10px] uppercase tracking-[0.3em] font-medium border-b border-black pb-1 self-start text-black hover:text-gray-400 hover:border-gray-400 transition-all"
              >
                Suscribirse →
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 text-center py-5 text-[10px] text-gray-400 uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} Soldevilla. Todos los derechos reservados.
      </div>
    </footer>
  );
}
