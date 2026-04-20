import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Success() {
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
                        to="/"
                        className="bg-gray-900 text-white py-4 px-10 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium text-center"
                    >
                        Tornar a l'Inici
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
