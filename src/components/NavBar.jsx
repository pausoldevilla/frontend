import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
        setRecentSearches(stored);
    }, []);

    const handleSearchEnter = () => {
        if (!searchQuery) return;
        let stored = [...recentSearches];
        if (!stored.includes(searchQuery)) {
            stored.unshift(searchQuery);
            if (stored.length > 5) stored.pop();
            localStorage.setItem("recentSearches", JSON.stringify(stored));
            setRecentSearches(stored);
        }
        setSearchQuery("");
    };

    const leftMenuItems = ["busqueda", "interior", "exterior", "suculentas", "florales"];
    const rightMenuItems = ["jardines", "acerca", "contacto"];

    const renderLeftSubmenu = () => {
        switch (activeSubmenu) {
            case "busqueda":
                return (
                    <div id="busqueda" className="flex flex-col relative bg-white p-4">
                        <div className="flex items-center gap-2 relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearchEnter()}
                                className="border-b border-gray-300 outline-none px-0 pr-5 py-1 w-56 text-sm focus:border-green-500"
                            />
                            <span
                                className="absolute right-0 top-1 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={() => setSearchQuery("")}
                            >
                                ✕
                            </span>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            {searchQuery === ""
                                ? recentSearches.map((s, i) => (
                                    <a key={i} href="#" className="text-sm text-gray-700 hover:text-green-600">
                                        {s}
                                    </a>
                                ))
                                : null}
                        </div>
                        <div id="searchResults" className={searchQuery ? "block" : "hidden"}></div>
                    </div>
                );

            case "interior":
                return (
                    <div id="interior" className="flex flex-col bg-white p-4">
                        {["Verde clásico", "Tropical", "Compactas", "Colgantes"].map((item, i) => (
                            <a key={i} href="#" className="text-gray-700 hover:text-green-600">
                                {item}
                            </a>
                        ))}
                    </div>
                );

            case "exterior":
                return (
                    <div id="exterior" className="flex flex-col bg-white p-4">
                        {["Sol", "Sombra", "Mediterráneas", "Arbustivas"].map((item, i) => (
                            <a key={i} href="#" className="text-gray-700 hover:text-green-600">
                                {item}
                            </a>
                        ))}
                    </div>
                );

            case "suculentas":
                return (
                    <div id="suculentas" className="flex flex-col bg-white p-4">
                        {["Cactus", "Mini suculentas", "Colección", "Premium"].map((item, i) => (
                            <a key={i} href="#" className="text-gray-700 hover:text-green-600">
                                {item}
                            </a>
                        ))}
                    </div>
                );

            case "florales":
                return (
                    <div id="florales" className="flex flex-col bg-white p-4">
                        {["Estacionales", "Perennes", "Color intenso", "Delicadas"].map((item, i) => (
                            <a key={i} href="#" className="text-gray-700 hover:text-green-600">
                                {item}
                            </a>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    const renderRightSubmenu = () => {
        switch (activeSubmenu) {
            case "jardines":
                return (
                    <div id="jardines" className="flex flex-col bg-white p-4">
                        <a href="#" className="text-gray-700 hover:text-green-600">
                            Carrer de Girona 208, Sabadell
                        </a>
                    </div>
                );

            case "acerca":
                return (
                    <div id="acerca" className="flex flex-col bg-white p-4">
                        {["Historia", "Misión", "Equipo"].map((item, i) => (
                            <a key={i} href="#" className="text-gray-700 hover:text-green-600">
                                {item}
                            </a>
                        ))}
                    </div>
                );

            case "contacto":
                return (
                    <div id="contacto" className="flex flex-col bg-white p-4">
                        {["Email", "Teléfono", "Ubicación"].map((item, i) => (
                            <a key={i} href="#" className="text-gray-700 hover:text-green-600">
                                {item}
                            </a>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full h-24 bg-white border-b border-gray-200 z-50">
            <div className="top-row flex justify-center items-center p-2.5 relative bg-gray-50 shadow">
                {/* Left Menu */}
                <div className="menu-left absolute left-10 top-1/2 -translate-y-1/2 flex gap-6 items-center">
                    {leftMenuItems.map((item) => (
                        <div key={item} className="dropdown" onMouseEnter={() => setActiveSubmenu(item)}>
                            <a href="#" className="drop-link text-gray-800 hover:text-green-600 flex items-center gap-1">
                                {item === "busqueda" ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#1f1f1f"
                                    >
                                        <path d="m777.65-143.89-247.89-248q-29.61 24.77-68.3 38.22-38.69 13.44-79.23 13.44-100.45 0-169.78-69.36t-69.33-169.5q0-100.14 69.25-169.6 69.26-69.46 169.5-69.46t169.71 69.42q69.46 69.43 69.46 169.67 0 41.91-14.08 80.75-14.08 38.85-37.58 67.28l248 247.41-39.73 39.73Zm-395.57-252.3q76.8 0 129.9-53.02 53.1-53.03 53.1-130 0-76.98-53.1-129.98-53.1-53-130-53t-129.9 53.02q-53 53.02-53 130 0 76.98 53.01 129.98 53.02 53 129.99 53Z" />
                                    </svg>
                                ) : (
                                    item.charAt(0).toUpperCase() + item.slice(1)
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Logo */}
                <div className="logo font-serif font-bold text-lg tracking-wider flex flex-col items-center justify-center">
                    <Link to="/" className="flex flex-col items-center justify-center text-black no-underline">
                        <img src="img/logo.png" alt="logo" className="w-12 h-12" />
                        soldevilla
                    </Link>
                </div>

                {/* Right Menu */}
                <div className="menu-right absolute right-10 top-1/2 -translate-y-1/2 flex gap-6 items-center">
                    {rightMenuItems.map((item) => (
                        <div key={item} className="dropdown" onMouseEnter={() => setActiveSubmenu(item)}>
                            <a href="#" className="drop-link text-gray-800 hover:text-green-600">
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </a>
                        </div>
                    ))}
                    <Link to="/login" className="text-gray-800 hover:text-green-600">
                        Mi cuenta</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                        <path d="M289.42-105.77q-28.14 0-47.88-19.7-19.73-19.7-19.73-47.84 0-28.15 19.7-47.88 19.7-19.73 47.84-19.73 28.14 0 47.88 19.7 19.73 19.7 19.73 47.84 0 28.14-19.7 47.88-19.7 19.73-47.84 19.73Zm380.42 0q-28.14 0-47.88-19.7-19.73-19.7-19.73-47.84 0-28.15 19.7-47.88 19.7-19.73 47.84-19.73 28.15 0 47.88 19.7 19.73 19.7 19.73 47.84 0 28.14-19.7 47.88-19.7 19.73-47.84 19.73ZM242.23-729.19l101.39 212.31h268.65q3.46 0 6.15-1.74 2.7-1.73 4.62-4.8l107.31-195q2.3-4.23.38-7.5-1.92-3.27-6.54-3.27H242.23Zm-27.05-55.96h544.47q24.35 0 36.52 20.41 12.17 20.42.98 41.51l-124.92 226.5q-9.04 16.81-25.1 26.31-16.06 9.5-34.52 9.5H325.62l-47.12 86.23q-3.08 4.61-.19 10 2.88 5.38 8.65 5.38h450.42v55.96H289.53q-39.07 0-58.67-33.07-19.59-33.07-1.4-66.27l57.08-101.63-143.83-303.26H68.08v-55.96h109.8l37.3 78.39Zm128.44 268.27h275.96-275.96Z" />
                    </svg>
                </div>
            </div>
            {activeSubmenu && (
                <div className="sub-header flex flex-col p-5 px-10 bg-white z-40" onMouseLeave={() => setActiveSubmenu(null)}> {renderLeftSubmenu()} {renderRightSubmenu()}
                </div>)}
        </header>);
}