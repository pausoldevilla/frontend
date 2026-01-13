import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Contacto() {
  const navigate = useNavigate();
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
      const response = await fetch("/api/contacto", {
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
      <div className="pt-24 pb-12 lg:pt-40 min-h-screen container mx-auto px-6">

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-6xl mx-auto items-start">

          {/* Left Column: Title & Info */}
          <div className="w-full md:w-1/2">
            <button
              onClick={() => navigate(-1)}
              className="mb-8 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors"
            >
              ← Volver
            </button>
            <h1 className="text-left text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8 leading-tight">
              Contacta con nosotros
            </h1>

            <div className="mb-8 text-left text-lg">
              <p className="text-gray-600 mb-8 leading-relaxed">
                Estamos aquí para ayudarte a transformar tus espacios. Si tienes dudas sobre nuestras plantas, necesitas asesoramiento para tu jardín o simplemente quieres saber más sobre nuestros servicios, no dudes en escribirnos. Nuestro equipo de expertos te responderá lo antes posible.
              </p>

              <h3 className="font-semibold text-xl mb-4 text-gray-900">Información de Contacto</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Email</span>
                  <span>info.soldevilla@gmail.com</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Teléfono</span>
                  <span>+34 900 123 456</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Dirección</span>
                  <span>Carrer de Girona 208, Sabadell</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Horario</span>
                  <span>Lunes - Viernes: 10:00 - 20:00</span>
                  <span>Sábado: 11:00 - 15:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full md:w-1/2 bg-white">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
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
                  className="w-full px-4 py-2 border border-gray-300"
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
                  className="w-full px-4 py-2 border border-gray-300"
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
                  rows="5"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300"
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
      </div>

      {/* Map Section */}
      {/* Map Section */}
      <div className="max-w-6xl mx-auto mb-12 h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.636603248881!2d2.1074853!3d41.5454486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a494e330555555%3A0x1234567890abcdef!2sCarrer%20de%20Girona%2C%20208%2C%2008203%20Sabadell%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1600000000000!5m2!1ses!2ses"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
      <Footer />
    </>
  );
}