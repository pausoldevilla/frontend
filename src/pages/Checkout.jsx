import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const API_PROFILE_URL = 'http://localhost:3000/api/usuari/perfil';
const API_COMANDES_URL = 'http://localhost:3000/api/comandes';

const STEPS = ['Envío', 'Pago', 'Confirmación'];

export default function Checkout() {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();

    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState('');

    // Shipping form
    const [shipping, setShipping] = useState({
        nom: '',
        carrer: '',
        ciutat: '',
        codiPostal: '',
        pais: 'España'
    });

    // Payment form
    const [payment, setPayment] = useState({
        metode: 'targeta',
        numeroTargeta: '',
        caducitat: '',
        cvv: ''
    });

    // Pre-fill from user profile
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }
        if (cartItems.length === 0 && !orderSuccess) {
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
    }, [navigate, cartItems.length, orderSuccess]);

    const handleShippingChange = (field, value) => {
        setShipping(prev => ({ ...prev, [field]: value }));
    };

    const handlePaymentChange = (field, value) => {
        setPayment(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = () => {
        setError('');
        if (currentStep === 0) {
            if (!shipping.nom || !shipping.carrer || !shipping.ciutat || !shipping.codiPostal) {
                setError('Por favor, completa todos los campos de envío.');
                return false;
            }
        }
        if (currentStep === 1) {
            if (!payment.numeroTargeta || !payment.caducitat || !payment.cvv) {
                setError('Por favor, completa todos los datos de la tarjeta.');
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

        const orderData = {
            productes: cartItems.map(item => ({
                producte: item._id,
                nom: item.nom,
                quantitat: item.quantity,
                preuUnitari: item.preu,
                imatge: item.imatge
            })),
            adreca: shipping,
            metodePagament: payment.metode,
            total: getCartTotal()
        };

        try {
            const res = await fetch(API_COMANDES_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Error al crear el pedido');
            }

            const result = await res.json();
            setOrderId(result.data._id);
            setOrderSuccess(true);
            clearCart();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Success Screen ──
    if (orderSuccess) {
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
                        <h1 className="text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-4">Pedido Confirmado</h1>
                        <p className="text-gray-500 font-light mb-2">Gracias por tu compra. Te hemos enviado un email con los detalles.</p>
                        {orderId && (
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mt-6">
                                Nº Pedido: <span className="text-gray-700">{orderId}</span>
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                        <Link
                            to="/"
                            className="bg-gray-900 text-white py-4 px-10 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium text-center"
                        >
                            Volver al Inicio
                        </Link>
                        <Link
                            to="/tienda"
                            className="border border-gray-900 text-gray-900 py-4 px-10 hover:bg-gray-50 transition-all text-[11px] uppercase tracking-[0.3em] font-medium text-center"
                        >
                            Seguir Comprando
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // ── Main Checkout ──
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
                                    Continuar al Pago
                                </button>
                            </div>
                        )}

                        {/* Step 2: Pago */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Método de Pago</h2>

                                <div className="mb-10 w-full max-w-sm mx-auto">
                                    <div className="w-full aspect-[1.586/1] bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 flex flex-col justify-between text-white shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                                        <div className="flex justify-between items-start relative z-10 opacity-80 h-8">
                                            <div className="w-10 h-7 bg-gray-300 rounded flex items-center justify-center backdrop-blur-sm overflow-hidden border border-gray-400/30">
                                                <div className="w-full h-[60%] border-t border-b border-gray-500/30"></div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] uppercase tracking-widest opacity-60">PAGO SEGURO</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto mb-5 relative z-10">
                                            <div className="text-xl sm:text-2xl font-mono tracking-[0.15em] sm:tracking-[0.2em] text-gray-100 min-h-[2rem]">
                                                {payment.numeroTargeta || '•••• •••• •••• ••••'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between relative z-10">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Titular</span>
                                                <span className="text-xs sm:text-sm font-medium tracking-widest uppercase truncate max-w-[150px] min-h-[1.25rem]">
                                                    {shipping.nom || 'NOMBRE APELLIDOS'}
                                                </span>
                                            </div>
                                            <div className="flex gap-4 sm:gap-6 text-right">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Caducidad</span>
                                                    <span className="text-xs sm:text-sm font-mono tracking-widest min-h-[1.25rem]">{payment.caducitat || 'MM/AA'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">CVV</span>
                                                    <span className="text-xs sm:text-sm font-mono tracking-widest min-h-[1.25rem]">{payment.cvv || '•••'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">Número de Tarjeta</label>
                                        <input
                                            type="text"
                                            value={payment.numeroTargeta}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, '');
                                                let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
                                                handlePaymentChange('numeroTargeta', formatted.substring(0, 19));
                                            }}
                                            className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-mono tracking-widest"
                                            placeholder="0000 0000 0000 0000"
                                            maxLength={19}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">Caducidad</label>
                                            <input
                                                type="text"
                                                value={payment.caducitat}
                                                onChange={(e) => {
                                                    let val = e.target.value.replace(/\D/g, '');
                                                    if (val.length >= 3) {
                                                        val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                                    }
                                                    handlePaymentChange('caducitat', val);
                                                }}
                                                className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-mono tracking-widest"
                                                placeholder="MM/AA"
                                                maxLength={5}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">CVV</label>
                                            <input
                                                type="text"
                                                value={payment.cvv}
                                                onChange={(e) => {
                                                    let val = e.target.value.replace(/\D/g, '');
                                                    handlePaymentChange('cvv', val.substring(0, 4));
                                                }}
                                                className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors text-sm font-mono tracking-widest"
                                                placeholder="000"
                                                maxLength={4}
                                            />
                                        </div>
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
                                        onClick={nextStep}
                                        className="flex-1 bg-gray-900 text-white py-5 hover:bg-black transition-all text-[11px] uppercase tracking-[0.3em] font-medium"
                                    >
                                        Revisar Pedido
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Confirmación */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Confirmar Pedido</h2>

                                {/* Shipping Summary */}
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

                                {/* Payment Summary */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Método de Pago</p>
                                        <button onClick={() => setCurrentStep(1)} className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors underline underline-offset-4">
                                            Editar
                                        </button>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-6">
                                        <p className="text-sm font-medium capitalize">Tarjeta de crédito/débito</p>
                                        {payment.numeroTargeta && (
                                            <p className="text-sm font-light text-gray-600 mt-1">
                                                •••• •••• •••• {payment.numeroTargeta.slice(-4)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Products list */}
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
                                        {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
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
