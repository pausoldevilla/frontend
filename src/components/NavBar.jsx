import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";

export default function NavBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);
    const [liveResults, setLiveResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [menuMobileOpen, setMenuMobileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const { getCartCount } = useCart() || { getCartCount: () => 0 };

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
        setRecentSearches(stored);

        const userToken = localStorage.getItem("authToken");
        setIsLoggedIn(!!userToken);

        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                if (data.status === "success" && Array.isArray(data.data)) {
                    setAllProducts(data.data);
                }
            })
            .catch(err => console.error("Error fetching for live search:", err));
    }, []);

    // Scroll lock
    useEffect(() => {
        if (menuMobileOpen || showSearch) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [menuMobileOpen, showSearch]);

    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const filtered = allProducts.filter(p =>
                p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);
            setLiveResults(filtered);
        } else {
            setLiveResults([]);
        }
    }, [searchQuery, allProducts]);

    const handleSearchEnter = (queryToUse = searchQuery) => {
        if (!queryToUse.trim()) return;

        let stored = [...recentSearches];
        const normalized = queryToUse.trim();
        if (!stored.includes(normalized)) {
            stored.unshift(normalized);
            if (stored.length > 5) stored.pop();
            localStorage.setItem("recentSearches", JSON.stringify(stored));
            setRecentSearches(stored);
        }

        navigate(`/search?q=${encodeURIComponent(normalized)}`);
        setSearchQuery("");
        setShowSearch(false);
        setMenuMobileOpen(false); // Close mobile menu if it was open
    };

    const leftMenuItems = [
        { name: "Interior", path: "/categoria/interior" },
        { name: "Exterior", path: "/categoria/exterior" },
        { name: "Suculentas", path: "/categoria/suculentas" },
        { name: "Florales", path: "/categoria/florales" }
    ];

    const rightMenuItems = [
        { name: "Jardines", path: "/jardines" },
        { name: "Acerca", path: "/acerca" },
        { name: "Contacto", path: "/contacto" }
    ];

    const accountRoute = isLoggedIn ? "/account" : "/login";

    return (
        <header className="fixed top-0 left-0 w-full border-b border-gray-200 z-50 bg-white">
            {/* Desktop Menu */}
            <div className="hidden lg:flex justify-center items-center p-3 relative bg-white shadow">
                <div className="absolute left-10 flex gap-6 items-center">
                    <button onClick={() => setShowSearch(!showSearch)} className="text-gray-800 hover:text-red-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
                        </svg>
                    </button>
                    {leftMenuItems.map(item => (
                        <Link key={item.name} to={item.path} className="text-gray-800 hover:text-red-900 transition-colors">
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="logo font-serif font-bold text-lg tracking-wider flex flex-col items-center justify-center">
                    <Link to="/" className="flex flex-col items-center text-black no-underline">
                        <img src="/img/logo.png" className="w-12 h-12" alt="Logo Soldevilla" />
                        soldevilla
                    </Link>
                </div>

                <div className="absolute right-10 flex gap-6 items-center">
                    {rightMenuItems.map(item => (
                        <Link key={item.name} to={item.path} className="text-gray-800 hover:text-red-900 transition-colors">
                            {item.name}
                        </Link>
                    ))}
                    <Link to={accountRoute} className="hover:text-red-900 text-gray-800">Mi cuenta</Link>

                    <Link to="/cart" className="relative text-gray-800 hover:text-red-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M286.15-97.69q-29.15 0-49.57-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.57-20.42 29.16 0 49.58 20.42 20.42 20.42 20.42 49.58 0 29.15-20.42 49.57-20.42 20.43-49.58 20.43Zm387.7 0q-29.16 0-49.58-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.58-20.42 29.15 0 49.57 20.42t20.42 49.58q0 29.15-20.42 49.57Q703-97.69 673.85-97.69ZM240.61-730 342-517.69h272.69q3.46 0 6.16-1.73 2.69-1.73 4.61-4.81l107.31-195q2.31-4.23.38-7.5-1.92-3.27-6.54-3.27h-486Zm-28.76-60h555.38q24.54 0 37.11 20.89 12.58 20.88 1.2 42.65L677.38-494.31q-9.84 17.31-26.03 26.96-16.2 9.66-35.5 9.66H324l-46.31 84.61q-3.08 4.62-.19 10 2.88 5.39 8.65 5.39h457.69v60H286.15q-40 0-60.11-34.5-20.12-34.5-1.42-68.89l57.07-102.61L136.16-810H60v-60h113.85l38 80ZM342-517.69h280-280Z" />
                        </svg>
                        {getCartCount() > 0 && <span className="absolute -top-2 -right-2 bg-red-900 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{getCartCount()}</span>}
                    </Link>
                </div>
            </div>

            {/* Search Submenu (Full Width Below) */}
            {showSearch && (
                <div className="flex flex-col items-center py-12 bg-white shadow-sm animate-in slide-in-from-top duration-300 border-t border-gray-50 absolute lg:relative top-16 lg:top-0 left-0 w-full h-[calc(100vh-4rem)] lg:h-auto z-40 overflow-y-auto lg:overflow-visible">
                    <div className="w-full max-w-xl px-10">
                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="BUSCAR..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearchEnter()}
                                className="border-b border-gray-200 outline-none px-0 pr-8 py-2 w-full text-base focus:border-black transition-colors uppercase tracking-[0.2em] bg-transparent font-light"
                                autoFocus
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-0 top-3 text-gray-400 hover:text-black transition-colors">✕</button>
                            )}
                        </div>

                        <div className="space-y-10">
                            {/* Live Results Section */}
                            {searchQuery.trim().length > 1 && (
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium mb-4">Sugerencias</p>
                                    <div className="flex flex-col gap-3">
                                        {liveResults.length > 0 ? (
                                            liveResults.map(p => (
                                                <Link
                                                    key={p._id}
                                                    to={`/producto/${p._id}`}
                                                    onClick={() => { setShowSearch(false); setMenuMobileOpen(false); }}
                                                    className="group"
                                                >
                                                    <span className="text-[11px] font-light uppercase tracking-widest text-black group-hover:underline underline-offset-8 decoration-black transition-all">{p.nom}</span>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-xs font-light text-gray-400 italic">No se han encontrado resultados.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Recent Searches Section */}
                            {recentSearches.length > 0 && (
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium mb-4">Búsquedas recientes</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {recentSearches.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSearchEnter(s)}
                                                className="text-[11px] font-light text-black hover:underline underline-offset-8 decoration-black uppercase tracking-widest transition-all"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Header Toolbar */}
            <div className="flex lg:hidden justify-between items-center px-4 h-16 bg-white shadow-sm relative z-50">
                <div className="flex gap-4">
                    <button onClick={() => { setMenuMobileOpen(!menuMobileOpen); setShowSearch(false); }} className="text-gray-800">
                        {menuMobileOpen ? "✕" : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" /></svg>}
                    </button>
                    <button onClick={() => { setShowSearch(!showSearch); setMenuMobileOpen(false); }} className="text-gray-800">
                        {showSearch ? "✕" : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" /></svg>}
                    </button>
                </div>
                <Link to="/" onClick={() => { setMenuMobileOpen(false); setShowSearch(false); }} className="flex items-center">
                    <img src="/img/logo.png" className="w-8 h-8" alt="Logo Soldevilla" />
                </Link>
                <div className="flex gap-4">
                    <Link to={accountRoute} onClick={() => { setMenuMobileOpen(false); setShowSearch(false); }} className="text-gray-800"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-492.31q-57.75 0-98.87-41.12Q340-574.56 340-632.31q0-57.75 41.13-98.87 41.12-41.13 98.87-41.13 57.75 0 98.87 41.13Q620-690.06 620-632.31q0 57.75-41.13 98.88-41.12 41.12-98.87 41.12ZM180-187.69v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54t121.73 14.54q60.35 14.54 119.65 43.61 26.7 13.46 42.66 38.5Q780-306 780-276.62v88.93H180Zm60-60h480v-28.93q0-12.15-7.04-22.5-7.04-10.34-19.11-16.88-51.7-25.46-105.42-38.58Q534.7-367.69 480-367.69q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm240-304.62q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 384.62Z" /></svg></Link>
                    <Link to="/cart" onClick={() => { setMenuMobileOpen(false); setShowSearch(false); }} className="relative text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M286.15-97.69q-29.15 0-49.57-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.57-20.42 29.16 0 49.58 20.42 20.42 20.42 20.42 49.58 0 29.15-20.42 49.57-20.42 20.43-49.58 20.43Zm387.7 0q-29.16 0-49.58-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.58-20.42 29.15 0 49.57 20.42t20.42 49.58q0 29.15-20.42 49.57Q703-97.69 673.85-97.69ZM240.61-730 342-517.69h272.69q3.46 0 6.16-1.73 2.69-1.73 4.61-4.81l107.31-195q2.31-4.23.38-7.5-1.92-3.27-6.54-3.27h-486Zm-28.76-60h555.38q24.54 0 37.11 20.89 12.58 20.88 1.2 42.65L677.38-494.31q-9.84 17.31-26.03 26.96-16.2 9.66-35.5 9.66H324l-46.31 84.61q-3.08 4.62-.19 10 2.88 5.39 8.65 5.39h457.69v60H286.15q-40 0-60.11-34.5-20.12-34.5-1.42-68.89l57.07-102.61L136.16-810H60v-60h113.85l38 80ZM342-517.69h280-280Z" /></svg>
                        {getCartCount() > 0 && <span className="absolute -top-1 -right-1 bg-red-900 text-white text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full">{getCartCount()}</span>}
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {menuMobileOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 flex flex-col py-6 px-10 gap-6 animate-in slide-in-from-left duration-300 h-[calc(100vh-4rem)] overflow-y-auto fixed top-16 left-0 w-full z-40">
                    {[...leftMenuItems, ...rightMenuItems].map((item) => (
                        <Link key={item.name} to={item.path} onClick={() => setMenuMobileOpen(false)} className="text-sm uppercase tracking-[0.2em] font-medium text-gray-800 border-b border-gray-50 pb-2">
                            {item.name}
                        </Link>
                    ))}
                    <Link to={accountRoute} onClick={() => setMenuMobileOpen(false)} className="text-sm uppercase tracking-[0.2em] font-medium text-gray-800 border-b border-gray-50 pb-2">
                        Mi Cuenta
                    </Link>
                </div>
            )}
        </header>
    );
}