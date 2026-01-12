import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from "../pages/CartContext";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, clearCart, getCartTotal, updateQuantity } = useCart();

    return (
        <>
            <NavBar />
            <div className="pt-32 pb-12 px-6 max-w-[1200px] mx-auto min-h-screen">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 text-gray-400 hover:text-black flex items-center gap-2 self-start uppercase text-[10px] tracking-[0.3em] font-medium transition-colors"
                >
                    ← Volver
                </button>
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12 tracking-tight">Tu Cesta</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl mb-8 text-gray-500 font-light">Tu cesta está vacía actualmente.</p>
                        <Link to="/" className="text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors uppercase tracking-widest text-sm">Explorar productos</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-12 gap-12 text-gray-900">
                        <div className="md:col-span-8 flex flex-col gap-0 border-t border-gray-100">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex gap-8 py-8 border-b border-gray-100 items-start">
                                    <Link to={`/producto/${item._id}`} className="w-32 h-32 bg-[#ede3ca] p-4 flex-shrink-0 cursor-pointer block">
                                        <img src={item.imatge} alt={item.nom} className="w-full h-full object-contain mix-blend-multiply" />
                                    </Link>
                                    <div className="flex-1 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <Link to={`/producto/${item._id}`} className="font-medium text-xl hover:text-gray-600 transition-colors block">
                                                    {item.nom}
                                                </Link>
                                                <p className="font-light text-lg">{(item.preu * item.quantity).toFixed(2)} €</p>
                                            </div>
                                            <p className="text-gray-500 text-sm">{item.preu} € / ud.</p>
                                        </div>

                                        <div className="flex items-end justify-between mt-6">
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs uppercase tracking-widest text-gray-400">Cantidad</span>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 transition-colors text-sm"
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-light w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 transition-colors text-sm"
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-gray-400 text-xs uppercase tracking-widest hover:text-red-900 transition-colors border-b border-transparent hover:border-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-gray-400 text-xs uppercase tracking-widest hover:text-gray-900 transition-colors self-start mt-8 border-b border-transparent hover:border-gray-900 pb-1"
                            >
                                Vaciar cesta
                            </button>
                        </div>

                        <div className="md:col-span-4">
                            <div className="bg-gray-50 p-10 sticky top-32">
                                <h2 className="text-lg font-medium mb-8 uppercase tracking-widest">Resumen</h2>
                                <div className="flex justify-between mb-4 text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-light">{getCartTotal().toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between mb-8 text-sm">
                                    <span className="text-gray-600">Envío</span>
                                    <span className="text-green-700">Gratis</span>
                                </div>
                                <div className="border-t border-gray-200 pt-6 flex justify-between items-baseline mb-8">
                                    <span className="text-base uppercase tracking-widest font-medium">Total</span>
                                    <span className="text-2xl font-light">{getCartTotal().toFixed(2)} €</span>
                                </div>
                                <button className="w-full bg-gray-900 text-white py-4 hover:bg-black transition-all text-xs uppercase tracking-[0.2em]">
                                    Tramitar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
