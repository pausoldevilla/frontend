import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Shop() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        setLoading(true);
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success" && Array.isArray(data.data)) {
                    setProducts(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        const filtered = products.filter(producto => {
            const matchesPrice = producto.preu <= priceRange[1];
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.some(cat => cat.toLowerCase() === producto.categoria.toLowerCase());
            const matchesSearch = !searchQuery.trim() ||
                producto.nom.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPrice && matchesCategory && matchesSearch;
        });

        if (sortBy === "asc") {
            return [...filtered].sort((a, b) => a.preu - b.preu);
        } else if (sortBy === "desc") {
            return [...filtered].sort((a, b) => b.preu - a.preu);
        }
        return filtered;
    }, [products, priceRange, selectedCategories, searchQuery, sortBy]);

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

                <h1 className="text-left text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-4 pl-2">
                    Catálogo
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed font-light mb-16 pl-2 max-w-2xl">
                    Explora todo nuestro catálogo. Filtra por precio y categorías para encontrar la planta perfecta para tu espacio.
                </p>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <Sidebar
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        showCategories={true}
                    />

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <p className="text-center text-lg">Cargando catálogo...</p>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-20 flex flex-col items-center gap-4">
                                <p className="text-lg text-gray-500 font-light italic">
                                    No se han encontrado productos que coincidan con los filtros.
                                </p>
                                <button
                                    onClick={() => {
                                        setPriceRange([0, 200]);
                                        setSelectedCategories([]);
                                        setSearchQuery("");
                                        setSortBy("default");
                                    }}
                                    className="text-[10px] uppercase tracking-[0.3em] font-medium border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all font-sans"
                                >
                                    Limpiar todos los filtros
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                                {filteredAndSortedProducts.map((producto) => (
                                    <Link
                                        key={producto._id}
                                        to={`/producto/${producto._id}`}
                                        className="group w-full flex flex-col cursor-pointer text-black no-underline"
                                    >
                                        <div className="relative overflow-hidden bg-[#ede3ca] aspect-[3/4] mb-6">
                                            <img
                                                src={producto.imatge}
                                                alt={producto.nom}
                                                className="w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col items-start text-left gap-2 pl-2">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                                                {producto.categoria}
                                            </p>
                                            <h2 className="text-base font-medium tracking-wide hover:underline transition-colors decoration-gray-900 underline-offset-4">
                                                {producto.nom}
                                            </h2>
                                            <p className="text-sm font-light text-gray-900 mt-1">
                                                {producto.preu} €
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
