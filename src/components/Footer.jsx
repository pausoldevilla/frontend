import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces</h3>
          <ul className="flex flex-col gap-2 text-gray-900">
            <li><Link to="/" className="hover:text-red-900">Inicio</Link></li>
            <li><Link to="/acerca" className="hover:text-red-900">Acerca</Link></li>
            <li><Link to="/contacto" className="hover:text-red-900">Contacto</Link></li>
            <li><Link to="/jardines" className="hover:text-red-900">Jardines</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto</h3>
          <ul className="flex flex-col gap-2 text-gray-900">
            <li>Email: info.soldevilla@gmail.com</li>
            <li>Teléfono: +34 900 123 456</li>
            <li>Dirección: Carrer de Girona 208, Sabadell</li>
            <li>Horario: Lunes - Viernes: 10-20h | Sábado: 11-15h</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Síguenos</h3>
          <div className="flex gap-4 text-gray-900">
            <a href="#" className="hover:text-red-900">Facebook</a>
            <a href="#" className="hover:text-red-900">Instagram</a>
            <a href="#" className="hover:text-red-900">Twitter</a>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 text-center py-4 text-sm text-gray-900">
        © {new Date().getFullYear()} Soldevilla. Todos los derechos reservados.
      </div>
    </footer>
  );
}
