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
              className="mb-8 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors border-b border-transparent hover:border-black pb-1"
            >
              ← Volver
            </button>
            <h1 className="text-left text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] text-gray-900 mb-12 leading-tight">
              Contacta con nosotros
            </h1>

            <div className="mb-8 text-left text-lg">
              <p className="text-gray-600 mb-8 leading-relaxed">
                Estamos aquí para ayudarte a transformar tus espacios. Si tienes dudas sobre nuestras plantas, necesitas asesoramiento para tu jardín o simplemente quieres saber más sobre nuestros servicios, no dudes en escribirnos. Nuestro equipo de expertos te responderá lo antes posible.
              </p>

              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8 border-t border-gray-100 pt-8">Información de Contacto</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">Email</span>
                  <span className="text-base font-light">info.soldevilla@gmail.com</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">Teléfono</span>
                  <span className="text-base font-light">+34 900 123 456</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">Dirección</span>
                  <span className="text-base font-light">Carrer de Girona 208, Sabadell</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">Horario</span>
                  <span className="text-base font-light">Lu-Vi 10:00-20:00 | Sa 11:00-15:00</span>
                </div>
              </div>
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

              <div className="space-y-8">
                <div>
                  <label htmlFor="nombre" className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors text-base font-light bg-transparent"
                    placeholder="TU NOMBRE"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-medium">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors text-base font-light bg-transparent"
                    placeholder="TU@CORREO.COM"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors text-base font-light bg-transparent resize-none"
                    placeholder="ESCRIBE TU MENSAJE AQUÍ..."
                  ></textarea>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex justify-center py-5 px-4 text-white bg-black hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-[11px] tracking-[0.3em] font-medium"
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