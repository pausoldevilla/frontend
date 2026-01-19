import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success" && Array.isArray(data.data)) {
                    const filtered = data.data.filter(
                        (p) => p.categoria.toLowerCase() === categoryName.toLowerCase()
                    );
                    setProducts(filtered);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, [categoryName]);

    return (
        <>
            <NavBar />
            <div className="pt-32 pb-12 px-6 max-w-[1400px] mx-auto min-h-screen">
                <button
                    onClick={() => navigate("/")}
                    className="mb-12 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors pl-2"
                >
                    ← Inicio
                </button>
                <h1 className="text-left text-3xl md:text-4xl font-medium tracking-tight mb-6 pl-2">
                    {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </h1>

                <div className="mb-16 pl-2 max-w-2xl">
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                        {{
                            interior: "Transforma tus espacios interiores en oasis de tranquilidad con nuestra selección de plantas de interior. Perfectas para purificar el aire y añadir un toque de vida a cualquier rincón de tu hogar, estas plantas se adaptan a diversas condiciones de luz y estilo.",
                            exterior: "Embellece tu jardín, terraza o balcón con nuestra colección de exterior. Desde arbustos resistentes hasta flores vibrantes que desafían las estaciones, encuentra todo lo que necesitas para crear tu propio paraíso al aire libre.",
                            suculentas: "Descubre la belleza resistente y de bajo mantenimiento. Nuestras suculentas son ideales para quienes buscan añadir verde sin complicaciones, ofreciendo formas geométricas únicas y colores fascinantes que decoran por sí mismos.",
                            florales: "Llena tu vida de color y aroma. Nuestra colección de plantas florales está cuidadosamente seleccionada para traer alegría y frescura, convirtiendo cualquier espacio en un espectáculo visual vibrante."
                        }[categoryName.toLowerCase()] || "Explora nuestra selección de productos de alta calidad, elegidos pensando en ti."}
                    </p>
                </div>

                {loading ? (
                    <p className="text-center text-lg">Cargando productos...</p>
                ) : products.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">
                        No hay productos en esta categoría.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {products.map((producto) => (
                            <Link
                                key={producto._id}
                                to={`/producto/${producto._id}`}
                                className="group w-full flex flex-col cursor-pointer text-black no-underline"
                            >
                                <div className="relative overflow-hidden bg-[#ede3ca] aspect-[3/4] mb-6">
                                    <img
                                        src={producto.imatge}
                                        alt={producto.nom}
                                        className="w-full h-full object-contain p-8 mix-blend-multiply"
                                    />
                                </div>
                                <div className="flex flex-col items-start text-left gap-2 pl-2">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                                        {producto.categoria}
                                    </p>
                                    <h2 className="text-lg font-medium tracking-wide hover:underline transition-colors decoration-gray-900 underline-offset-4">
                                        {producto.nom}
                                    </h2>
                                    <p className="text-base font-light text-gray-900 mt-1">
                                        {producto.preu} €
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
