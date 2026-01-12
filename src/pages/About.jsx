import React from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function About() {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen font-sans text-gray-900">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-12 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors"
                >
                    ← Volver
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                    <div className="md:col-span-4">
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Nosotros</h1>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 max-w-2xl">
                            Soldevilla es mucho más que una tienda de plantas.
                            Somos un proyecto dedicado al diseño, la botánica y la creación de espacios
                            llenos de vida con sede en Sabadell, Barcelona.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                    <div className="md:col-span-7 overflow-hidden bg-[#ede3ca]">
                        <img
                            src="/img/nosotros.png"
                            alt="Nuestro Jardín"
                            className="w-full h-auto object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="md:col-span-5 pt-8 md:pt-16">
                        <h2 className="text-3xl font-medium mb-8 uppercase tracking-widest">Nuestra Visión</h2>
                        <p className="text-lg font-light text-gray-600 leading-relaxed mb-10">
                            Buscamos el equilibrio entre la arquitectura moderna y la naturaleza.
                            Creemos que el diseño no termina en el mobiliario, sino en la vida que crece a su alrededor.
                            Nuestra labor transforma casas en hogares y espacios de trabajo en refugios.
                        </p>
                        <Link
                            to="/contacto"
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium group hover:underline underline-offset-8 decoration-gray-400 transition-all duration-300"
                        >
                            <span>Contacta con nosotros</span>
                            <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                <div className="mt-40 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-gray-100 pt-12">
                    <div className="md:col-span-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Responsabilidad</h3>
                        <p className="font-light text-sm text-gray-600">
                            Entendemos nuestra actividad como una forma de cuidado. Cada planta es un compromiso
                            con la biodiversidad y el bienestar emocional de quienes las reciben.
                        </p>
                    </div>
                    <div className="md:col-span-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Sostenibilidad</h3>
                        <p className="font-light text-sm text-gray-600">
                            Cuidamos cada detalle del proceso, desde la selección en origen hasta
                            el envase final, minimizando nuestro impacto ambiental.
                        </p>
                    </div>
                    <div className="md:col-span-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Curaduría</h3>
                        <p className="font-light text-sm text-gray-600">
                            Cada planta es seleccionada individualmente por su salud, estética
                            y capacidad de adaptación a los hogares modernos.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
