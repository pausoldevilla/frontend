import React from "react";

export default function Sidebar({
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    searchQuery = "",
    setSearchQuery = () => { },
    sortBy = "default",
    setSortBy = () => { },
    showCategories = true
}) {
    const categories = ["interior", "exterior", "suculentas", "florales"];

    const handleCategoryChange = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    return (
        <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-32 h-fit space-y-12 pr-8">
            {/* Search Filter */}
            <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">Buscar</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="FILTRAR POR NOMBRE..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-b border-gray-200 py-2 text-[11px] uppercase tracking-widest font-light outline-none focus:border-black transition-colors bg-transparent px-0"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-0 top-2.5 text-gray-400 hover:text-black transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Price Sorting */}
            <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">Ordenar por precio</h3>
                <div className="flex flex-col gap-4">
                    {[
                        { id: "default", label: "Precio habitual" },
                        { id: "asc", label: "Creciente" },
                        { id: "desc", label: "Decreciente" }
                    ].map((opt) => (
                        <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="radio"
                                    name="sortByPrice"
                                    className="sr-only peer"
                                    checked={sortBy === opt.id}
                                    onChange={() => setSortBy(opt.id)}
                                />
                                <div className="w-4 h-4 rounded-full border border-gray-200 peer-checked:border-[5px] peer-checked:border-black transition-all duration-200"></div>
                            </div>
                            <span className={`text-[11px] uppercase tracking-widest font-light transition-colors ${sortBy === opt.id ? "text-black font-medium" : "text-gray-600 group-hover:text-black"}`}>
                                {opt.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">Rango de Precio</h3>
                <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between items-center text-[11px] uppercase tracking-widest font-light text-gray-600">
                        <span>{priceRange[0]}€</span>
                        <span>Hasta {priceRange[1]}€</span>
                    </div>
                </div>
            </div>

            {/* Categories Filter */}
            {showCategories && (
                <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">Categoría</h3>
                    <div className="flex flex-col gap-3">
                        {categories.map(cat => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                    />
                                    <div className="w-4 h-4 border border-gray-200 peer-checked:bg-black peer-checked:border-black transition-all duration-200"></div>
                                    <svg
                                        className="absolute w-2 h-2 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-[11px] uppercase tracking-widest font-light text-gray-600 group-hover:text-black transition-colors capitalize">
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Clear Filters */}
            <button
                onClick={() => {
                    setPriceRange([0, 200]);
                    setSelectedCategories([]);
                    setSearchQuery("");
                    setSortBy("default");
                }}
                className="text-[9px] uppercase tracking-[0.4em] font-medium text-gray-400 hover:text-red-900 transition-colors pt-4 border-t border-gray-100 w-full text-left"
            >
                Limpiar filtros
            </button>
        </aside>
    );
}
