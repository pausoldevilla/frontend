import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Jardines() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <NavBar />

            <main className="pt-24 md:pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors border-b border-transparent hover:border-black pb-1 w-fit"
                    >
                        ← Volver
                    </button>
                    <h1 className="text-3xl md:text-5xl font-medium uppercase tracking-[0.2em] text-gray-900 leading-tight max-w-4xl">
                        Paisajismo de Gran Formato.
                    </h1>
                    <p className="mt-8 text-lg font-light text-gray-500 max-w-2xl leading-relaxed">
                        Nuestra división proyectual está dedicada a la concepción y ejecución de entornos botánicos
                        de alta complejidad. Desde el estudio previo hasta la consolidación técnica del espacio.
                    </p>
                </div>

                {/* Hero Image Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-32">
                    <div className="md:col-span-8 overflow-hidden bg-gray-50 aspect-[16/9] relative group">
                        <img
                            src="/img/jardin.jpg"
                            alt="Diseño de Jardines"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:col-span-4 flex flex-col justify-center h-full">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-6">El Proceso</h3>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg font-medium tracking-tight mb-2 uppercase tracking-[0.1em]">Consultoría Técnica</h4>
                                <p className="text-sm font-light text-gray-600 leading-relaxed">
                                    Desarrollamos estudios de viabilidad y planificación botánica para integraciones arquitectónicas y regeneración ambiental.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium tracking-tight mb-2 uppercase tracking-[0.1em]">Ejecución Proyectual</h4>
                                <p className="text-sm font-light text-gray-600 leading-relaxed">
                                    Lideramos la materialización de proyectos integrales, asegurando la cohesión entre el diseño conceptual y la realidad técnica.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-40 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-gray-100 pt-12">
                    <div className="md:col-span-4">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-6">Soluciones Integrales</h3>
                        <p className="font-light text-sm text-gray-600 mb-8 leading-relaxed">
                            Acompamos a profesionales y entidades en el desarrollo de sus activos botánicos. Contáctanos para iniciar un estudio preliminar.
                        </p>
                        <Link
                            to="/contacto"
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium border-b border-black pb-2 hover:text-gray-400 hover:border-gray-400 transition-all group w-fit"
                        >
                            <span>Solicitar propuesta</span>
                            <span className="inline-block transform group-hover:translate-x-1 transition-transform font-sans">→</span>
                        </Link>
                    </div>
                    <div className="md:col-span-4">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-6">Planes de Conservación</h3>
                        <p className="font-light text-sm text-gray-600 leading-relaxed">
                            Servicios avanzados de mantenimiento técnico para garantizar la evolución y salud de los ecosistemas arquitectónicos a largo plazo.
                        </p>
                    </div>
                    <div className="md:col-span-4">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-6">Paisajismo Sostenible</h3>
                        <p className="font-light text-sm text-gray-600 leading-relaxed">
                            Diseñamos ecosistemas autosuficientes que requieren mínimo consumo hídrico y favorecen la biodiversidad local, integrando la naturaleza en tu arquitectura.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
