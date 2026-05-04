import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_PROFILE_URL = 'http://localhost:3000/api/usuari/perfil';
const API_ORDERS_URL = 'http://localhost:3000/api/comandes/user';

const ESTAT_LABELS = {
    pendent_pagament: 'Pendent pagament',
    pendent: 'Pendent',
    pagat: 'Pagat',
    procesant: 'Procesant',
    enviat: 'Enviat',
    completat: 'Completat',
    cancelat: 'Cancel·lat',
};

const ESTAT_COLORS = {
    pendent_pagament: 'bg-red-100 text-red-600',
    pendent: 'bg-yellow-100 text-yellow-700',
    pagat: 'bg-green-100 text-green-700',
    procesant: 'bg-blue-100 text-blue-700',
    enviat: 'bg-indigo-100 text-indigo-700',
    completat: 'bg-gray-100 text-gray-700',
    cancelat: 'bg-gray-100 text-gray-400',
};

export default function UserDashboard() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(() => {
        const storedUser = localStorage.getItem('currentUserData');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUserData');
        navigate('/login', { replace: true });
    }, [navigate]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');
        
        try {
            // Fetch Profile
            const profileRes = await fetch(API_PROFILE_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!profileRes.ok) throw new Error("Error al obtener perfil");
            const profileData = await profileRes.json();
            setUserData(profileData.usuari);
            localStorage.setItem('currentUserData', JSON.stringify(profileData.usuari));

            // Fetch Orders
            const ordersRes = await fetch(API_ORDERS_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!ordersRes.ok) throw new Error("Error al obtener pedidos");
            const ordersData = await ordersRes.json();
            setOrders(ordersData.data);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) return <div className="p-20 text-center">Carregant dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-6xl mx-auto pt-32 pb-20 px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-3xl font-light uppercase tracking-widest mb-2">El meu Dashboard</h1>
                        <p className="text-gray-500 text-sm">Benvingut de nou, {userData?.nom}</p>
                    </div>
                    <button onClick={handleLogout} className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                        Tancar Sessió
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Perfil */}
                    <div className="lg:col-span-1 space-y-8">
                        <section>
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Informació Personal</h2>
                            <div className="bg-white p-8 border border-gray-100 space-y-4">
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Nom</span>
                                    <span className="text-lg font-light">{userData?.titol} {userData?.nom}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</span>
                                    <span className="text-lg font-light">{userData?.email}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Telèfon</span>
                                    <span className="text-lg font-light">{userData?.telefon || 'No especificat'}</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Adreça d'Enviament</h2>
                            <div className="bg-white p-8 border border-gray-100">
                                {userData?.adreca ? (
                                    <p className="font-light leading-relaxed">
                                        {userData.adreca.carrer}<br />
                                        {userData.adreca.codiPostal} {userData.adreca.ciutat}<br />
                                        {userData.adreca.pais}
                                    </p>
                                ) : (
                                    <p className="text-gray-400 italic">No hi ha adreça guardada</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Pedidos */}
                    <div className="lg:col-span-2">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Les meves Comandes</h2>
                        <div className="bg-white border border-gray-100 overflow-hidden">
                            {orders.length === 0 ? (
                                <div className="p-12 text-center text-gray-400 italic font-light">
                                    Encara no has realitzat cap comanda.
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400">ID</th>
                                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400">Data</th>
                                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400">Total</th>
                                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400">Estat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {orders.map(order => (
                                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-xs font-mono text-gray-500">#{order._id.slice(-6)}</td>
                                                <td className="px-6 py-4 text-sm font-light">{new Date(order.createdAt).toLocaleDateString('ca-ES')}</td>
                                                <td className="px-6 py-4 text-sm font-medium">{order.total.toFixed(2)}€</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[9px] uppercase tracking-widest px-2 py-1 ${ESTAT_COLORS[order.estat] || 'bg-gray-100 text-gray-500'}`}>
                                                        {ESTAT_LABELS[order.estat] || order.estat}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
