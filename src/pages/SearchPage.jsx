import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SearchPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success" && Array.isArray(data.data)) {
                    const lowerQuery = query.toLowerCase();
                    const filtered = data.data.filter(
                        (p) =>
                            p.nom.toLowerCase().includes(lowerQuery) ||
                            p.categoria.toLowerCase().includes(lowerQuery)
                    );
                    setProducts(filtered);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, [query]);

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
                <h1 className="text-left text-3xl md:text-4xl font-medium tracking-tight mb-16 pl-2">
                    Resultados para: "{query}"
                </h1>

                {loading ? (
                    <p className="text-center text-lg">Buscando productos...</p>
                ) : products.length === 0 ? (
                    <div className="text-center text-lg text-gray-500">
                        <p>No hemos encontrado productos que coincidan con tu búsqueda.</p>
                        <Link to="/" className="text-black underline mt-4 block">Volver al inicio</Link>
                    </div>
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
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">{producto.categoria}</p>
                                    <h2 className="text-lg font-medium tracking-wide hover:underline transition-colors decoration-gray-900 underline-offset-4">
                                        {producto.nom}
                                    </h2>
                                    <p className="text-base font-light text-gray-900 mt-1">{producto.preu} €</p>
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
