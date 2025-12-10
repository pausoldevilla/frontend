import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          nombre: "",
          email: "",
          mensaje: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus("error");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center pt-24 pb-12 lg:pt-40">
        
        <div className="w-full max-w-lg p-4 md:p-0">
          
          <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-2">
            Contáctanos
          </h1>
          <p className=" text-lg mb-8 text-gray-600">
            ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar? 
          </p>

          <form 
            onSubmit={handleSubmit} 
          >
            
            {status === "success" && (
              <p className="text-center text-green-600 p-3 bg-green-100 border border-green-300 font-medium">
                ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-red-600 p-3 bg-red-100 border border-red-300 font-medium">
                Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.
              </p>
            )}

            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                placeholder="Tu Nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                placeholder="tu@correo.com"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-semibold text-white bg-gray-900 hover:bg-black transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </div>
            
          </form>
          
        </div>
      </div>
      <Footer />
    </>
  );
}