import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Enlaces</h3>
          <ul className="flex flex-col gap-4 text-gray-900">
            <li><Link to="/" className="text-xs uppercase tracking-widest font-light hover:text-black transition-colors">Inicio</Link></li>
            <li><Link to="/acerca" className="text-xs uppercase tracking-widest font-light hover:text-black transition-colors">Acerca</Link></li>
            <li><Link to="/contacto" className="text-xs uppercase tracking-widest font-light hover:text-black transition-colors">Contacto</Link></li>
            <li><Link to="/paisajismo" className="text-xs uppercase tracking-widest font-light hover:text-black transition-colors">Paisajismo</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Contacto</h3>
          <ul className="flex flex-col gap-4 text-gray-600">
            <li className="text-xs uppercase tracking-widest font-light">Email: info.soldevilla@gmail.com</li>
            <li className="text-xs uppercase tracking-widest font-light">Teléfono: +34 900 123 456</li>
            <li className="text-xs uppercase tracking-widest font-light">Dirección: Carrer de Girona 208, Sabadell</li>
            <li className="text-xs uppercase tracking-widest font-light">Horario: Lu-Vi 10-20h | Sa 11-15h</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Newsletter</h3>
          <p className="text-xs uppercase tracking-widest font-light text-gray-600 mb-6 leading-relaxed">
            Suscríbete para recibir actualizaciones sobre nuestros proyectos y nuevas colecciones.
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="TU EMAIL"
              className="bg-transparent border-b border-gray-300 py-2 text-[10px] uppercase tracking-[0.2em] font-light focus:border-black outline-none transition-colors"
            />
            <button
              type="submit"
              className="text-[10px] uppercase tracking-[0.3em] font-medium border-b border-black pb-1 self-start hover:text-gray-400 hover:border-gray-400 transition-all"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-100 text-center py-8 text-[10px] text-gray-400 uppercase tracking-[0.3em] border-t border-gray-200">
        © {new Date().getFullYear()} Soldevilla. Todos los derechos reservados.
      </div>
    </footer>
  );
}
