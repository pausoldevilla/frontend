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
                        className="mb-8 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors"
                    >
                        ← Volver
                    </button>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 leading-tight max-w-4xl">
                        Cuidamos el verde de tu hogar.
                    </h1>
                    <p className="mt-8 text-lg font-light text-gray-500 max-w-2xl leading-relaxed">
                        Nuestra división de jardinería se especializa en la creación y mantenimiento de espacios que respiran.
                        Desde terrazas minimalistas hasta jardines mediterráneos.
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
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium mb-6">El Proceso</h3>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg font-medium tracking-tight mb-2">Curaduría Vegetal</h4>
                                <p className="text-sm font-light text-gray-600 leading-relaxed">
                                    Seleccionamos cada ejemplar por su carácter y adaptabilidad, asegurando una evolución natural del espacio.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium tracking-tight mb-2">Diseño Estructural</h4>
                                <p className="text-sm font-light text-gray-600 leading-relaxed">
                                    Creamos armonía entre los elementos arquitectónicos y el crecimiento orgánico de las plantas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-40 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-gray-100 pt-12">
                    <div className="md:col-span-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Consultoría</h3>
                        <p className="font-light text-sm text-gray-600 mb-4">
                            Transformamos tu visión en realidad. Contáctanos para evaluar tu espacio.
                        </p>
                        <Link
                            to="/contacto"
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium group decoration-gray-400 transition-all duration-300"
                        >
                            <span>Solicitar propuesta</span>
                            <span className="text-sm">→</span>
                        </Link>
                    </div>
                    <div className="md:col-span-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Mantenimiento Integral</h3>
                        <p className="font-light text-sm text-gray-600">
                            Ofrecemos planes de cuidado personalizados para asegurar que tu jardín prospere en cada estación del año, adaptándonos a las necesidades específicas de cada planta.
                        </p>
                    </div>
                    <div className="md:col-span-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Paisajismo Sostenible</h3>
                        <p className="font-light text-sm text-gray-600">
                            Diseñamos ecosistemas autosuficientes que requieren mínimo consumo hídrico y favorecen la biodiversidad local, integrando la naturaleza en tu arquitectura.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
