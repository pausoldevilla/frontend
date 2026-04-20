import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Sessió 17 - Exercici 4.1: Flux de checkout (frontend)
export default function Cancel() {
    return (
        <>
            <NavBar />
            <div className="pt-32 pb-10 px-6 max-w-[700px] mx-auto min-h-screen text-center">
                <div className="mb-8">
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-4">Pagament Cancel·lat</h1>
                    <p className="text-gray-500 font-light mb-2">Sembla que has cancel·lat el procés de pagament.</p>
                    <p className="text-gray-500 font-light">No s'ha realitzat cap càrrec. Pots tornar al carret i intentar-ho de nou quan vulguis.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <Link
                        to="/cart"
                        className="bg-gray-900 text-white py-4 px-10 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium text-center"
                    >
                        Tornar al Carret
                    </Link>
                    <Link
                        to="/"
                        className="border border-gray-900 text-gray-900 py-4 px-10 hover:bg-gray-50 transition-all text-[11px] uppercase tracking-[0.3em] font-medium text-center"
                    >
                        Tornar a l'Inici
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
