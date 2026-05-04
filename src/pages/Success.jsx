import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useCart } from '../pages/CartContext';

const API_CONFIRM_URL = 'http://localhost:3000/api/checkout/confirm-payment';

// Sessió 17 - Exercici 4.1: Flux de checkout (frontend)
export default function Success() {
    const { clearCart } = useCart();
    const [searchParams] = useSearchParams();
    const confirmedRef = useRef(false);

    useEffect(() => {
        // Evitem cridar-ho dues vegades (StrictMode)
        if (confirmedRef.current) return;
        confirmedRef.current = true;

        const sessionId = searchParams.get('session_id');
        const token = localStorage.getItem('authToken');

        // Netejar la cistella sempre que arribi aquí
        clearCart();

        // Confirmar el pagament al backend via session_id (fallback per a dev local)
        if (sessionId && token) {
            fetch(`${API_CONFIRM_URL}?session_id=${sessionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => console.log('Pagament confirmat:', data))
                .catch(err => console.error('Error confirmant pagament:', err));
        }
    }, [clearCart, searchParams]);

    return (
        <>
            <NavBar />
            <div className="pt-32 pb-10 px-6 max-w-[700px] mx-auto min-h-screen text-center">
                <div className="mb-8">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-4">Pagament Confirmat</h1>
                    <p className="text-gray-500 font-light mb-2">Gràcies per la teva compra! El teu pagament s'ha processat correctament.</p>
                    <p className="text-gray-500 font-light">Rebràs un correu electrònic de confirmació amb els detalls de la teva comanda properament.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <Link
                        to="/dashboard"
                        className="bg-gray-900 text-white py-4 px-10 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium text-center"
                    >
                        Veure les meves Comandes
                    </Link>
                    <Link
                        to="/shop"
                        className="border border-gray-900 text-gray-900 py-4 px-10 hover:bg-gray-50 transition-all text-[11px] uppercase tracking-[0.3em] font-medium text-center"
                    >
                        Seguir Comprant
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
