import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then((data) => {
                const item = data.data || data;
                setProduct(item);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                fetch("/api/products")
                    .then(res => res.json())
                    .then(data => {
                        const found = data.data?.find(p => p._id === id);
                        if (found) setProduct(found);
                        setLoading(false);
                    })
                    .catch(e => setLoading(false));
            });
    }, [id]);

    if (loading) return <div className="p-10 text-center">Cargando...</div>;
    if (!product) return <div className="p-10 text-center">Producto no encontrado</div>;

    return (
        <>
            <NavBar />
            <div className="flex flex-col md:flex-row pt-16 md:pt-24 min-h-[calc(100vh)]">

                <div className="w-full md:w-1/2 bg-[#ede3ca] flex items-center justify-center p-12 md:p-20 relative">
                    <img
                        src={product.imatge}
                        alt={product.nom}
                        className="w-auto max-h-[60vh] object-contain drop-shadow-2xl"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col bg-white justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-12 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors border-b border-transparent hover:border-black pb-1"
                    >
                        ← Volver
                    </button>

                    <h1 className="text-4xl md:text-5xl font-medium uppercase tracking-[0.2em] mb-16 text-gray-900 leading-tight">
                        {product.nom}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 border-t border-gray-100 pt-10">
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 font-medium">Precio</span>
                            <span className="text-2xl font-light text-gray-900">{product.preu} €</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 font-medium">Categoría</span>
                            <span className="text-base text-gray-700 uppercase tracking-widest">{product.categoria}</span>
                        </div>

                        <div className="md:col-span-8">
                            <p className="text-gray-600 font-light leading-relaxed text-lg">
                                {product.descripcio || "Descripción no disponible para este producto. Es una excelente opción para decorar tu hogar y dar vida a tus espacios."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center gap-8 border-t border-gray-100">
                        <div className="flex items-center gap-6">
                            <span className="text-xs uppercase tracking-widest text-gray-400">Cantidad</span>
                            <div className="flex items-center gap-4">
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 transition-colors"
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>
                                <span className="text-lg font-light w-4 text-center">{quantity}</span>
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 transition-colors"
                                    onClick={() => setQuantity(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                addToCart(product, quantity);
                                alert("Producto añadido a la cesta");
                            }}
                            className="flex-1 bg-gray-900 text-white px-8 py-5 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium w-full sm:w-auto"
                        >
                            Añadir a la cesta
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
