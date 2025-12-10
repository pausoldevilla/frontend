import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
            <div
                style={{
                    backgroundImage: "url('/img/bg-form.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    minHeight: "100vh",
                }}
            >
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
        <div
            style={{
                backgroundImage: "url('/img/bg-form.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
            }}
        >
            <div className="flex justify-center p-4">
                <div className="w-full max-w-md p-6 mt-10 mb-10">

                    <div className="logo font-serif font-bold text-3xl tracking-wider flex flex-col items-center justify-center mb-6">
                        <Link to="/" className="flex flex-col items-center text-black no-underline">
                            <img src="img/logo.png" className="w-20 h-20" alt="Logo" />
                            soldevilla
                        </Link>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Información de la Cuenta</h2>
                    <div className="shadow-md p-4 mb-6 space-y-3 bg-white bg-opacity-80">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Nombre:</span>
                            <span>{userData.titol} {userData.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Email:</span>
                            <span>{userData.email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Teléfono:</span>
                            <span>{userData.telefon}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Fecha de Nacimiento:</span>
                            <span>{userData.dataNaixement}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Miembro desde:</span>
                            <span>{userData.memberSince}</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Dirección de Facturación</h2>
                    <div className="shadow-md p-4 mb-6 space-y-3 bg-white bg-opacity-80">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Calle:</span>
                            <span>{userData.adreca.carrer}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Ciudad:</span>
                            <span>{userData.adreca.ciutat}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Código Postal:</span>
                            <span>{userData.adreca.codiPostal}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">País:</span>
                            <span>{userData.adreca.pais}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-semibold text-white bg-gray-900 hover:bg-black transition duration-150 mb-4"
                    >
                        Cerrar Sesión
                    </button>

                </div>
            </div>
        </div>
    );
}