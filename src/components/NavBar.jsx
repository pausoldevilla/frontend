import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);
    const [menuMobileOpen, setMenuMobileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
        setRecentSearches(stored);
        
        const userToken = localStorage.getItem("authToken"); 
        setIsLoggedIn(!!userToken);
        
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
    
    const accountRoute = isLoggedIn ? "/account" : "/login";


    const submenu = (items) => (
        <div className="flex flex-col p-4 ml-8 gap-2">
            {items.map((item, i) => (
                <a key={i} href="#" className="text-gray-700 hover:text-red-900">{item}</a>
            ))}
        </div>
    );

    const renderLeftSubmenu = () => {
        switch (activeSubmenu) {
            case "busqueda":
                return (
                    <div className="flex flex-col relative p-4 ml-8 gap-2">
                        <div className="flex items-center gap-2 relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearchEnter()}
                                className="border-b border-gray-300 outline-none px-0 pr-5 py-1 w-56 text-sm focus:border-red-500"
                            />
                            <span className="absolute right-0 top-1 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={() => setSearchQuery("")}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" /></svg></span>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            {searchQuery === "" && recentSearches.map((s, i) => (
                                <a key={i} href="#" className="text-sm text-gray-700 hover:text-red-900">
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>
                );
            case "interior": return submenu(["Verde clásico", "Tropical", "Compactas", "Colgantes"]);
            case "exterior": return submenu(["Sol", "Sombra", "Mediterráneas", "Arbustivas"]);
            case "suculentas": return submenu(["Cactus", "Mini suculentas", "Colección", "Premium"]);
            case "florales": return submenu(["Estacionales", "Perennes", "Color intenso", "Delicadas"]);
            default: return null;
        }
    };

    const renderRightSubmenu = () => {
        switch (activeSubmenu) {
            case "jardines": return submenu(["Carrer Girona 208, Sabadell"]);
            case "acerca": return submenu(["Historia", "Misión", "Equipo"]);
            case "contacto": // El enlace de contacto ya no tiene submenú, pero lo dejamos aquí para evitar errores
            default: return null;
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full border-b border-gray-200 z-50 bg-white">

            {/* Menú de Escritorio (Desktop) */}
            <div className="hidden lg:flex justify-center items-center p-3 relative bg-white shadow">

                <div className="absolute left-10 flex gap-6 items-center">
                    {leftMenuItems.map((item) => (
                        <div key={item} onMouseEnter={() => setActiveSubmenu(item)}>
                            <a href="#" className="text-gray-800 hover:text-red-900">
                                {item === "busqueda" ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#1f1f1f"
                                    >
                                        <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
                                    </svg>
                                ) : (
                                    item.charAt(0).toUpperCase() + item.slice(1)
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="logo font-serif font-bold text-lg tracking-wider flex flex-col items-center justify-center">
                    <Link to="/" className="flex flex-col items-center text-black no-underline">
                        <img src="img/logo.png" className="w-12 h-12" alt="Logo Soldevilla" />
                        soldevilla
                    </Link>
                </div>

                <div className="absolute right-10 flex gap-6 items-center">
                    {rightMenuItems.map((item) => {
                        if (item === "contacto") {
                            return (
                                <div key={item}>
                                    <Link 
                                        to="/contact" 
                                        className="text-gray-800 hover:text-red-900"
                                        onMouseEnter={() => setActiveSubmenu(null)} 
                                    >
                                        Contacto
                                    </Link>
                                </div>
                            );
                        }
                        
                        return (
                            <div key={item} onMouseEnter={() => setActiveSubmenu(item)}>
                                <a href="#" className="text-gray-800 hover:text-red-900">
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            </div>
                        );
                    })}
                    <Link to={accountRoute} className="hover:text-red-900">Mi cuenta</Link>
                    <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M286.15-97.69q-29.15 0-49.57-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.57-20.42 29.16 0 49.58 20.42 20.42 20.42 20.42 49.58 0 29.15-20.42 49.57-20.42 20.43-49.58 20.43Zm387.7 0q-29.16 0-49.58-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.58-20.42 29.15 0 49.57 20.42t20.42 49.58q0 29.15-20.42 49.57Q703-97.69 673.85-97.69ZM240.61-730 342-517.69h272.69q3.46 0 6.16-1.73 2.69-1.73 4.61-4.81l107.31-195q2.31-4.23.38-7.5-1.92-3.27-6.54-3.27h-486Zm-28.76-60h555.38q24.54 0 37.11 20.89 12.58 20.88 1.2 42.65L677.38-494.31q-9.84 17.31-26.03 26.96-16.2 9.66-35.5 9.66H324l-46.31 84.61q-3.08 4.62-.19 10 2.88 5.39 8.65 5.39h457.69v60H286.15q-40 0-60.11-34.5-20.12-34.5-1.42-68.89l57.07-102.61L136.16-810H60v-60h113.85l38 80ZM342-517.69h280-280Z" /></svg></span>
                </div>
            </div>

            {activeSubmenu && (
                <div className="hidden lg:flex flex-col px-10 bg-white shadow"
                    onMouseLeave={() => setActiveSubmenu(null)}>
                    {renderLeftSubmenu()}
                    {renderRightSubmenu()}
                </div>
            )}

            {/* Menú Móvil (Mobile) */}
            <div className="flex lg:hidden justify-between items-center px-4 h-16 bg-white shadow">
                <div className="flex gap-5 text-xl">
                    <button onClick={() => setMenuMobileOpen(!menuMobileOpen)} className="text-2xl">
                        {menuMobileOpen ? (
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#1f1f1f"
                                >
                                    <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
                                </svg>
                            </span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" /></svg>
                        )}
                    </button>

                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#1f1f1f"
                        >
                            <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
                        </svg>
                    </span>
                </div>

                <Link to="/" className="flex flex-col items-center">
                    <img src="img/logo.png" className="w-10 h-10" alt="Logo Soldevilla" />
                </Link>

                <div className="flex gap-5 text-xl">
                    <span><Link to={accountRoute} className="hover:text-red-900"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-492.31q-57.75 0-98.87-41.12Q340-574.56 340-632.31q0-57.75 41.13-98.87 41.12-41.13 98.87-41.13 57.75 0 98.87 41.13Q620-690.06 620-632.31q0 57.75-41.13 98.88-41.12 41.12-98.87 41.12ZM180-187.69v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54t121.73 14.54q60.35 14.54 119.65 43.61 26.7 13.46 42.66 38.5Q780-306 780-276.62v88.93H180Zm60-60h480v-28.93q0-12.15-7.04-22.5-7.04-10.34-19.11-16.88-51.7-25.46-105.42-38.58Q534.7-367.69 480-367.69q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm240-304.62q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 384.62Z" /></svg></Link></span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M286.15-97.69q-29.15 0-49.57-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.57-20.42 29.16 0 49.58 20.42 20.42 20.42 20.42 49.58 0 29.15-20.42 49.57-20.42 20.43-49.58 20.43Zm387.7 0q-29.16 0-49.58-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.58-20.42 29.15 0 49.57 20.42t20.42 49.58q0 29.15-20.42 49.57Q703-97.69 673.85-97.69ZM240.61-730 342-517.69h272.69q3.46 0 6.16-1.73 2.69-1.73 4.61-4.81l107.31-195q2.31-4.23.38-7.5-1.92-3.27-6.54-3.27h-486Zm-28.76-60h555.38q24.54 0 37.11 20.89 12.58 20.88 1.2 42.65L677.38-494.31q-9.84 17.31-26.03 26.96-16.2 9.66-35.5 9.66H324l-46.31 84.61q-3.08 4.62-.19 10 2.88 5.39 8.65 5.39h457.69v60H286.15q-40 0-60.11-34.5-20.12-34.5-1.42-68.89l57.07-102.61L136.16-810H60v-60h113.85l38 80ZM342-517.69h280-280Z" /></svg></span>
                </div>
            </div>


            {menuMobileOpen && (
                <div className="lg:hidden flex flex-col bg-white p-5 gap-3 border-t shadow text-center">
                    {/* Filtramos "contacto" para renderizarlo con Link por separado */}
                    {leftMenuItems.concat(rightMenuItems)
                        .filter(item => item !== 'contacto')
                        .map((item, i) => (
                            <button 
                                key={i} 
                                className="py-2 text-gray-800 border-b" 
                                onClick={() => setMenuMobileOpen(false)}
                            >
                                {item.toUpperCase()}
                            </button>
                        ))}
                    
                    {/* Enlace de CONTACTO para móvil */}
                    <Link 
                        to="/contacto" 
                        className="py-2 text-gray-800 border-b hover:text-red-900" 
                        onClick={() => setMenuMobileOpen(false)}
                    >
                        CONTACTO
                    </Link>

                    {/* Línea original de cuenta */}
                    <Link to={accountRoute} className="py-2 text-gray-800 border-b" onClick={() => setMenuMobileOpen(false)}>MI CUENTA</Link>
                </div>
            )}
        </header>
    );
}