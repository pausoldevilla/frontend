import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend,
    BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    BarElement,
    Title, 
    Tooltip, 
    Legend
);

const API_BASE = 'http://localhost:3000/api';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [data, setData] = useState({
        users: [],
        products: [],
        orders: [],
        stats: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE}/products/${editingProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingProduct)
            });
            if (res.ok) {
                setEditingProduct(null);
                fetchData();
            } else {
                alert("Error al actualizar producto");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');
        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            const [usersRes, productsRes, ordersRes, statsRes] = await Promise.all([
                fetch(`${API_BASE}/usuari/all`, { headers }),
                fetch(`${API_BASE}/products`), // Products might be public or use admin route if we added one
                fetch(`${API_BASE}/comandes/all`, { headers }),
                fetch(`${API_BASE}/comandes/stats`, { headers })
            ]);

            const usersData = await usersRes.json();
            const productsData = await productsRes.json();
            const ordersData = await ordersRes.json();
            const statsData = await statsRes.json();

            setData({
                users: usersData.data || [],
                products: productsData.data || [],
                orders: ordersData.data || [],
                stats: statsData.status === 'success' ? statsData.data : []
            });
        } catch (err) {
            console.error("Error fetching admin data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const chartData = {
        labels: data.stats.map(s => s._id),
        datasets: [
            {
                label: 'Ventas (€)',
                data: data.stats.map(s => s.totalVendes),
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const renderOverview = () => (
        <div className="animate-fade-in border-t border-gray-100 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div>
                    <p className="font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] mb-2">Total Usuarios</p>
                    <p className="text-4xl font-light text-gray-900">{data.users.length}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] mb-2">Total Productos</p>
                    <p className="text-4xl font-light text-gray-900">{data.products.length}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] mb-2">Total Pedidos</p>
                    <p className="text-4xl font-light text-gray-900">{data.orders.length}</p>
                </div>
            </div>

            <div className="pt-10 border-t border-gray-100">
                <div className="flex justify-between items-end mb-8">
                    <h3 className="font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em]">Evolución de Ventas</h3>
                </div>
                <div className="h-[400px]">
                    <Line data={chartData} options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { 
                            y: { border: { display: false }, grid: { color: '#f3f4f6' } },
                            x: { grid: { display: false } }
                        }
                    }} />
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="animate-fade-in border-t border-gray-100 pt-10">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Nombre</th>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Email</th>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Rol</th>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map(user => (
                            <tr key={user._id} className="border-b border-gray-100 group">
                                <td className="py-6 text-lg font-medium tracking-wide text-gray-900">{user.nom}</td>
                                <td className="py-6 text-base font-light text-gray-600">{user.email}</td>
                                <td className="py-6">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500">
                                        {user.rol}
                                    </span>
                                </td>
                                <td className="py-6 text-right">
                                    <button className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-medium border-b border-red-500 text-red-500 pb-1 hover:text-red-700 hover:border-red-700 transition-all">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="animate-fade-in border-t border-gray-100 pt-10">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em]">Catálogo de Productos</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Producto</th>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Precio</th>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Stock</th>
                            <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map(product => (
                            <tr key={product._id} className="border-b border-gray-100 group">
                                <td className="py-6 text-lg font-medium tracking-wide text-gray-900">{product.nom}</td>
                                <td className="py-6 text-base font-light text-gray-600">{product.preu} €</td>
                                <td className="py-6 text-base font-light text-gray-600">{product.stock} u.</td>
                                <td className="py-6 text-right space-x-6 transition-opacity">
                                    <button onClick={() => setEditingProduct(product)} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-medium border-b border-black text-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">Editar</button>
                                    <button onClick={() => handleDeleteProduct(product._id)} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-medium border-b border-red-500 text-red-500 pb-1 hover:text-red-700 hover:border-red-700 transition-all">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            
            <div className="max-w-[1400px] mx-auto pt-40 pb-24 px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-4">Administración</h1>
                        <p className="text-gray-500 font-light max-w-xl text-lg leading-relaxed">Gestión integral del catálogo, usuarios y análisis de ventas de Soldevilla.</p>
                    </div>
                </div>

                {/* Editorial Tabs */}
                <div className="flex space-x-12 mb-16 border-b border-gray-200 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'overview', label: 'Resumen' },
                        { id: 'users', label: 'Usuarios' },
                        { id: 'products', label: 'Productos' },
                        { id: 'orders', label: 'Pedidos' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-[11px] uppercase tracking-[0.3em] font-medium transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'border-b border-black text-black' 
                                : 'text-gray-400 hover:text-gray-900 border-b border-transparent'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="py-24 text-lg font-light text-gray-500">
                        Cargando productos...
                    </div>
                ) : (
                    <div>
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'users' && renderUsers()}
                        {activeTab === 'products' && renderProducts()}
                        {activeTab === 'orders' && (
                            <div className="animate-fade-in border-t border-gray-100 pt-10">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr>
                                                <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">ID Pedido</th>
                                                <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Cliente</th>
                                                <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200">Total</th>
                                                <th className="py-4 font-medium text-gray-900 uppercase text-[10px] tracking-[0.2em] border-b border-gray-200 text-right">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.orders.map(order => (
                                                <tr key={order._id} className="border-b border-gray-100">
                                                    <td className="py-6 text-base font-light text-gray-400">#{order._id.slice(-6)}</td>
                                                    <td className="py-6 text-lg font-medium tracking-wide text-gray-900">{order.usuari?.nom || 'Anónimo'}</td>
                                                    <td className="py-6 text-base font-light text-gray-600">{order.total.toFixed(2)} €</td>
                                                    <td className="py-6 text-right">
                                                        <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${order.pagat ? 'text-gray-900' : 'text-gray-400'}`}>
                                                            {order.pagat ? 'Pagado' : 'Pendiente'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {editingProduct && (
                <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50 p-6">
                    <div className="w-full max-w-2xl bg-white border border-gray-100 p-10 md:p-16 shadow-2xl">
                        <div className="flex justify-between items-start mb-12">
                            <h3 className="text-2xl font-medium uppercase tracking-[0.2em] text-gray-900">Editar Producto</h3>
                            <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-black transition-colors text-3xl font-light leading-none">&times;</button>
                        </div>
                        <form onSubmit={handleUpdateProduct} className="space-y-10">
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-gray-900 mb-2">Nombre de la planta</label>
                                <input type="text" className="w-full border-b border-gray-300 py-3 text-xl font-light text-gray-900 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300" placeholder="Ej. Ficus Lyrata" value={editingProduct.nom || ''} onChange={e => setEditingProduct({...editingProduct, nom: e.target.value})} required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-gray-900 mb-2">Precio (€)</label>
                                    <input type="number" step="0.01" className="w-full border-b border-gray-300 py-3 text-xl font-light text-gray-900 focus:outline-none focus:border-black transition-colors bg-transparent" value={editingProduct.preu || 0} onChange={e => setEditingProduct({...editingProduct, preu: parseFloat(e.target.value)})} required />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-gray-900 mb-2">Unidades en Stock</label>
                                    <input type="number" className="w-full border-b border-gray-300 py-3 text-xl font-light text-gray-900 focus:outline-none focus:border-black transition-colors bg-transparent" value={editingProduct.stock || 0} onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} required />
                                </div>
                            </div>
                            <div className="flex justify-end pt-8">
                                <button type="button" onClick={() => setEditingProduct(null)} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium border-b border-black pb-2 hover:text-gray-400 hover:border-gray-400 transition-all mr-8">
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-black text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-gray-800 transition-colors">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
