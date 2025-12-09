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
            console.log("Frontend: Fent crida a l'API amb el token."); 
            const response = await fetch(API_PROFILE_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error(`Frontend: API va retornar error ${response.status}. Forçant logout.`); 
                if (response.status === 401 || response.status === 403) {
                    handleLogout();
                    return;
                }
                throw new Error(`Error ${response.status}: No s'han pogut obtenir les dades del perfil.`);
            }

            const apiResponse = await response.json(); 
            
            const data = apiResponse.usuari || apiResponse; 
            
            if (!data.nom || !data.email) {
                console.error("Frontend: Dades incompletes rebuts, faltan 'nom' o 'email'."); 
                throw new Error("El servidor ha retornat un format d'usuari incomplet.");
            }

            const formattedData = {
                name: data.nom, 
                email: data.email, 
                memberSince: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A',
            };

            localStorage.setItem('currentUserData', JSON.stringify(formattedData));
            setUserData(formattedData);
            setError(null);
            console.log("Frontend: Dades carregades correctament."); 

        } catch (err) {
            console.error("Frontend: Error final carregant dades:", err.message); 
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [handleLogout]);


    useEffect(() => {
        const userToken = localStorage.getItem('authToken');
        
        if (!userToken) {
            console.log("Frontend: No s'ha trobat 'authToken' a localStorage. Redirigint."); 
            handleLogout();
            return;
        } 
        
        const storedData = localStorage.getItem('currentUserData');
        if (!storedData) { 
            console.log("Frontend: Carregant dades de l'API per primera vegada."); 
            fetchUserData(userToken);
        } else {
            setIsLoading(false);
        }

    }, [handleLogout, fetchUserData]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-xl font-semibold text-gray-800">
                    <p>⏳ Carregant dades del compte...</p>
                </div>
            </div>
        );
    }
    
    if (error || !userData) {
          return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md p-8 md:p-10">
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className="font-bold">Error de Càrrega</p>
                        <p>{error || "No s'ha trobat informació de l'usuari."}</p>
                        <button onClick={handleLogout} className="mt-2 text-sm text-red-500 underline">
                            Tancar sessió
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 md:p-10 relative"> 

                <div className="logo font-serif font-bold text-3xl tracking-wider flex flex-col items-center justify-center mb-8">
                    <Link to="/" className="flex flex-col items-center text-black no-underline">
                        <img src="img/logo.png" className="w-20 h-20" alt="Logo" />
                        soldevilla
                    </Link>
                </div>

                <p className="text-2xl text-gray-800 mt-4 mb-2 text-left">
                    Mi Cuenta
                </p>
                <p className="text-lg text-gray-600 mt-4 mb-6 text-left">
                    Aquesta és la informació del teu perfil.
                </p>
                
                <div className="space-y-4 mb-8 p-6 border border-gray-300 rounded-md bg-white shadow-sm">
                    <p className="flex justify-between items-center text-gray-700">
                        <span className="font-medium text-sm">Nom complet:</span>
                        <span className="font-semibold text-base">{userData.name}</span>
                    </p>
                    <p className="flex justify-between items-center text-gray-700">
                        <span className="font-medium text-sm">Email:</span>
                        <span className="font-semibold text-base">{userData.email}</span>
                    </p>
                    <p className="flex justify-between items-center text-gray-700">
                        <span className="font-medium text-sm">Membre des de:</span>
                        <span className="font-semibold text-base">{userData.memberSince}</span>
                    </p>
                </div>
                
                <button
                    onClick={handleLogout}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
                >
                    Tancar Sessió
                </button>
            </div>
        </div>
    );
}