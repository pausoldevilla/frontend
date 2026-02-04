import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_PROFILE_URL = 'http://localhost:3000/api/usuari/perfil';

export default function Account() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(() => {
        const storedUser = localStorage.getItem('currentUserData');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUserData');
        navigate('/login', { replace: true });
    }, [navigate]);


    const fetchUserData = useCallback(async (token) => {
        setIsLoading(true);

        try {
            const response = await fetch(API_PROFILE_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    handleLogout();
                    return;
                }
                throw new Error(`Error ${response.status}: No se pudieron obtener los datos del perfil.`);
            }

            const apiResponse = await response.json();
            const data = apiResponse.usuari || apiResponse;

            if (!data.nom || !data.email) {
                throw new Error("El servidor devolvió un formato de usuario incompleto.");
            }

            const formattedData = {
                name: data.nom,
                email: data.email,
                memberSince: data.createdAt ? new Date(data.createdAt).toLocaleDateString('es-ES') : 'N/A',
                titol: data.titol || '',
                dataNaixement: data.dataNaixement ? new Date(data.dataNaixement).toLocaleDateString('es-ES') : 'N/A',
                telefon: data.telefon || 'N/A',
                adreca: data.adreca,
            };

            localStorage.setItem('currentUserData', JSON.stringify(formattedData));
            setUserData(formattedData);
            setError(null);
        } catch (err) {
            console.error("Error cargando datos:", err.message);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [handleLogout]);

    useEffect(() => {
        const userToken = localStorage.getItem('authToken');
        if (!userToken) {
            handleLogout();
            return;
        }

        const storedData = localStorage.getItem('currentUserData');
        const needsRefresh = !storedData || !JSON.parse(storedData).adreca || !JSON.parse(storedData).titol;

        if (needsRefresh) {
            fetchUserData(userToken);
        } else {
            setIsLoading(false);
        }
    }, [handleLogout, fetchUserData]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl font-semibold text-gray-800">Cargando datos de la cuenta...</p>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div>
                <div className="flex justify-center items-center p-4 min-h-screen">
                    <div className="w-full max-w-md p-8">
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                            <p className="font-bold">Error de carga</p>
                            <p>{error || "No se encontró información del usuario."}</p>
                            <button onClick={handleLogout} className="mt-2 text-sm text-red-500 underline">
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div>
            <NavBar />
            {/* MODIFICACIÓN: Añado la clase "pt-16" al contenedor principal para evitar que se esconda detrás del NavBar. */}
            <div className="flex justify-center pt-24 pb-12 lg:pt-40">
                {/* MODIFICACIÓN: Quité el 'mt-10' de aquí, ya que el 'pt-16' ahora maneja el espacio superior. Dejo 'mb-10'. */}
                <div className="w-full max-w-md">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors border-b border-transparent hover:border-black pb-1"
                    >
                        ← Volver
                    </button>

                    <h1 className="text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-12 text-gray-900">
                        Mi Cuenta
                    </h1>

                    <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Información de la Cuenta</h2>
                    <div className="bg-white border border-gray-100 p-6 mb-10 space-y-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Nombre</span>
                            <span className="text-base font-light">{userData.titol} {userData.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Email</span>
                            <span className="text-base font-light">{userData.email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Teléfono</span>
                            <span className="text-base font-light">{userData.telefon}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Fecha de Nacimiento</span>
                            <span className="text-base font-light">{userData.dataNaixement}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Miembro desde</span>
                            <span className="text-base font-light">{userData.memberSince}</span>
                        </div>
                    </div>

                    <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Dirección de Facturación</h2>
                    <div className="bg-white border border-gray-100 p-6 mb-12 space-y-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Calle</span>
                            <span className="text-base font-light">{userData.adreca.carrer}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Ciudad</span>
                            <span className="text-base font-light">{userData.adreca.ciutat}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Código Postal</span>
                            <span className="text-base font-light">{userData.adreca.codiPostal}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">País</span>
                            <span className="text-base font-light">{userData.adreca.pais}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-black text-white py-5 px-4 hover:bg-gray-800 transition-all uppercase text-[11px] tracking-[0.3em] font-medium"
                    >
                        Cerrar Sesión
                    </button>

                </div>
            </div>
            <Footer />
        </div>

    );
}