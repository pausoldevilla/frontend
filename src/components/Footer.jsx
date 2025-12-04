import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-10">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><Link to="/" className="hover:text-green-600">Inicio</Link></li>
            <li><Link to="/acerca" className="hover:text-green-600">Acerca</Link></li>
            <li><Link to="/contacto" className="hover:text-green-600">Contacto</Link></li>
            <li><Link to="/jardines" className="hover:text-green-600">Jardines</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Email: info@soldevilla.com</li>
            <li>Teléfono: +34 600 123 456</li>
            <li>Dirección: Carrer de Girona 208, Sabadell</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Síguenos</h3>
          <div className="flex gap-4 text-gray-600">
            <a href="#" className="hover:text-green-600">Facebook</a>
            <a href="#" className="hover:text-green-600">Instagram</a>
            <a href="#" className="hover:text-green-600">Twitter</a>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Soldevilla. Todos los derechos reservados.
      </div>
    </footer>
  );
}
