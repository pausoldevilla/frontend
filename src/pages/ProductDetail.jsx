import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);

        fetch(`/api/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then((data) => {
                const item = data.data || data;
                setProduct(item);

                // Fetch related products
                fetch("/api/products")
                    .then(res => res.json())
                    .then(allData => {
                        const items = allData.data || allData;
                        if (Array.isArray(items)) {
                            const related = items.filter(p =>
                                p.categoria === item.categoria && p._id !== id
                            );
                            setRelatedProducts(related);
                        }
                    })
                    .catch(err => console.error("Error fetching related products:", err));

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-10 text-center py-40">Cargando...</div>;
    if (!product) return <div className="p-10 text-center py-40">Producto no encontrado</div>;

    return (
        <>
            <NavBar />
            <div className="flex flex-col md:flex-row min-h-[calc(100vh)]">
                {/* Product Section */}
                <div className="w-full md:w-1/2 bg-[#ede3ca] flex items-center justify-center p-12 md:p-20 relative pt-24 md:pt-32">
                    <img
                        src={product.imatge}
                        alt={product.nom}
                        className="w-auto max-h-[60vh] object-contain drop-shadow-2xl"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col bg-white justify-center pt-24 md:pt-40">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-12 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors border-b border-transparent hover:border-black pb-1"
                    >
                        ← Volver
                    </button>

                    <h1 className="text-3xl md:text-4xl font-medium uppercase tracking-[0.2em] mb-16 text-gray-900 leading-tight">
                        {product.nom}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 border-t border-gray-100 pt-10">
                        <div className="md:col-span-4 flex flex-col gap-12">
                            <div>
                                <span className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 font-medium">Precio</span>
                                <span className="text-2xl font-light text-gray-900">{product.preu} €</span>
                            </div>
                            <div>
                                <span className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 font-medium">Categoría</span>
                                <span className="text-base text-gray-700 uppercase tracking-widest">{product.categoria}</span>
                            </div>
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

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="py-24 px-6 max-w-[1400px] mx-auto border-t border-gray-100">
                    <div className="mb-16 px-2">
                        <h2 className="text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-4">
                            Relacionados
                        </h2>
                        <p className="text-gray-500 font-light max-w-xl text-lg leading-relaxed">
                            Otros artículos de la categoría {product.categoria} que podrían interesarte.
                        </p>
                    </div>

                    <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x px-2">
                        {relatedProducts.map((p) => (
                            <div key={p._id} className="flex-shrink-0 w-[75%] sm:w-[45%] lg:w-[23%] snap-start">
                                <Link
                                    to={`/producto/${p._id}`}
                                    className="group w-full flex flex-col cursor-pointer text-black no-underline"
                                >
                                    <div className="relative overflow-hidden bg-[#ede3ca] aspect-[3/4] mb-6">
                                        <img
                                            src={p.imatge}
                                            alt={p.nom}
                                            className="w-full h-full object-contain p-8 mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start text-left gap-2 pl-2">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest">{p.categoria}</p>
                                        <h3 className="text-lg font-medium tracking-wide hover:underline decoration-gray-900 underline-offset-4">
                                            {p.nom}
                                        </h3>
                                        <p className="text-base font-light text-gray-900 mt-1">{p.preu} €</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
