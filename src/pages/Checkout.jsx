import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../pages/CartContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const API_PROFILE_URL = 'http://localhost:3000/api/usuari/perfil';
const API_CHECKOUT_SESSION_URL = 'http://localhost:3000/api/checkout/create-session';

// Inicialitzem Stripe fora del component
// FIXME: Substituir per la clau pública real de Stripe
const stripePromise = loadStripe('pk_test_51...FIXME_INSERT_YOUR_PUBLIC_KEY_HERE');

const STEPS = ['Envío', 'Revisión'];

export default function Checkout() {
    const navigate = useNavigate();
    const { cartItems, getCartTotal } = useCart();

    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Shipping form
    const [shipping, setShipping] = useState({
        nom: '',
        carrer: '',
        ciutat: '',
        codiPostal: '',
        pais: 'España'
    });

    // Pre-fill from user profile
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }
        if (cartItems.length === 0) {
            navigate('/cart');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(API_PROFILE_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const apiRes = await res.json();
                    const data = apiRes.usuari || apiRes;
                    setShipping(prev => ({
                        ...prev,
                        nom: `${data.titol || ''} ${data.nom || ''}`.trim(),
                        carrer: data.adreca?.carrer || '',
                        ciutat: data.adreca?.ciutat || '',
                        codiPostal: data.adreca?.codiPostal || '',
                        pais: data.adreca?.pais || 'España'
                    }));
                }
            } catch (err) {
                console.error('Error cargando perfil:', err);
            }
        };
        fetchProfile();
    }, [navigate, cartItems.length]);

    const handleShippingChange = (field, value) => {
        setShipping(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = () => {
        setError('');
        if (currentStep === 0) {
            if (!shipping.nom || !shipping.carrer || !shipping.ciutat || !shipping.codiPostal) {
                setError('Por favor, completa todos los campos de envío.');
                return false;
            }
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep()) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setError('');
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmitOrder = async () => {
        setIsSubmitting(true);
        setError('');

        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            // 1. Cridar al backend per crear la sessió de Stripe
            const res = await fetch(API_CHECKOUT_SESSION_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productes: cartItems.map(item => ({
                        producte: item._id,
                        nom: item.nom,
                        quantitat: item.quantity,
                        preuUnitari: item.preu,
                        imatge: item.imatge
                    })),
                    adreca: shipping
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Error al crear la sessió de pagament');
            }

            const { id } = await res.json();

            // 2. Redirigir a Stripe Checkout
            const stripe = await stripePromise;
            const { error: stripeError } = await stripe.redirectToCheckout({
                sessionId: id
            });

            if (stripeError) {
                throw new Error(stripeError.message);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="pt-32 pb-10 px-6 max-w-[1200px] mx-auto min-h-screen">
                <button
                    onClick={() => navigate('/cart')}
                    className="mb-8 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors border-b border-transparent hover:border-black pb-1"
                >
                    ← Volver al Carrito
                </button>

                <h1 className="text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-12">Checkout</h1>

                {/* ── Stepper ── */}
                <div className="flex items-center gap-0 mb-16 max-w-lg">
                    {STEPS.map((step, idx) => (
                        <React.Fragment key={step}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                                    ${idx < currentStep ? 'bg-gray-900 text-white' : ''}
                                    ${idx === currentStep ? 'bg-gray-900 text-white ring-4 ring-gray-200' : ''}
                                    ${idx > currentStep ? 'bg-gray-100 text-gray-400' : ''}
                                `}>
                                    {idx < currentStep ? '✓' : idx + 1}
                                </div>
                                <span className={`text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block
                                    ${idx <= currentStep ? 'text-gray-900' : 'text-gray-300'}
                                `}>
                                    {step}
                                </span>
                            </div>
                            {idx < STEPS.length - 1 && (
                                <div className={`flex-1 h-px mx-4 ${idx < currentStep ? 'bg-gray-900' : 'bg-gray-200'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid md:grid-cols-12 gap-12">
                    {/* ── Left Column: Form ── */}
                    <div className="md:col-span-7 lg:col-span-8">

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-8 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Step 1: Envío */}
                        {currentStep === 0 && (
                            <div>
                                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Dirección de Envío</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">Nombre Completo</label>
                                        <input
                                            type="text"
                                            value={shipping.nom}
                                            onChange={(e) => handleShippingChange('nom', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-light"
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">Calle y Número</label>
                                        <input
                                            type="text"
                                            value={shipping.carrer}
                                            onChange={(e) => handleShippingChange('carrer', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-light"
                                            placeholder="Calle, número, piso..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">Ciudad</label>
                                            <input
                                                type="text"
                                                value={shipping.ciutat}
                                                onChange={(e) => handleShippingChange('ciutat', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-light"
                                                placeholder="Ciudad"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">Código Postal</label>
                                            <input
                                                type="text"
                                                value={shipping.codiPostal}
                                                onChange={(e) => handleShippingChange('codiPostal', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-light"
                                                placeholder="08000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">País</label>
                                        <input
                                            type="text"
                                            value={shipping.pais}
                                            onChange={(e) => handleShippingChange('pais', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-light"
                                            placeholder="España"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={nextStep}
                                    className="mt-10 w-full bg-gray-900 text-white py-5 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium"
                                >
                                    Revisar Pedido
                                </button>
                            </div>
                        )}

                        {/* Step 2: Revisión */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Confirmar Detalls</h2>

                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Dirección de Envío</p>
                                        <button onClick={() => setCurrentStep(0)} className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors underline underline-offset-4">
                                            Editar
                                        </button>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-6 space-y-1">
                                        <p className="text-sm font-medium">{shipping.nom}</p>
                                        <p className="text-sm font-light text-gray-600">{shipping.carrer}</p>
                                        <p className="text-sm font-light text-gray-600">{shipping.codiPostal}, {shipping.ciutat}</p>
                                        <p className="text-sm font-light text-gray-600">{shipping.pais}</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-4">Productos</p>
                                    <div className="border-t border-gray-100">
                                        {cartItems.map((item) => (
                                            <div key={item._id} className="flex gap-4 py-4 border-b border-gray-100 items-center">
                                                <div className="w-16 h-16 bg-[#ede3ca] p-2 flex-shrink-0">
                                                    <img src={item.imatge} alt={item.nom} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{item.nom}</p>
                                                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-light">{(item.preu * item.quantity).toFixed(2)} €</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-10">
                                    <button
                                        onClick={prevStep}
                                        className="flex-1 border border-gray-200 text-gray-600 py-5 hover:border-gray-400 transition-all text-[11px] uppercase tracking-[0.3em] font-medium"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        onClick={handleSubmitOrder}
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gray-900 text-white py-5 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Procesando...' : 'Ir al Pago (Stripe)'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Right Column: Order Summary ── */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <div className="bg-gray-50 p-10 sticky top-32">
                            <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Tu Pedido</h2>

                            <div className="space-y-4 mb-8 border-b border-gray-200 pb-8">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex gap-4 items-center">
                                        <div className="w-14 h-14 bg-[#ede3ca] p-2 flex-shrink-0">
                                            <img src={item.imatge} alt={item.nom} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.nom}</p>
                                            <p className="text-xs text-gray-400">x{item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-light flex-shrink-0">{(item.preu * item.quantity).toFixed(2)} €</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mb-4 text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-light">{getCartTotal().toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between mb-8 text-sm">
                                <span className="text-gray-600">Envío</span>
                                <span className="text-green-700">Gratis</span>
                            </div>
                            <div className="border-t border-gray-200 pt-6 flex justify-between items-baseline">
                                <span className="text-base uppercase tracking-widest font-medium">Total</span>
                                <span className="text-2xl font-light">{getCartTotal().toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
