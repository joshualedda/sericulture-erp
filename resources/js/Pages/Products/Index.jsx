import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index() {
    // Dummy Data for Inventory/Products
    const products = [
        { id: 1, name: 'Bivoltine Hybrid Eggs', category: 'Biological', price: '500.00', stock: 150, status: 'In Stock', image: 'https://images.unsplash.com/photo-1626078436897-095208993457?q=80&w=200' },
        { id: 2, name: 'S-1 Mulberry Saplings', category: 'Planting', price: '25.00', stock: 12, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1592150621344-82454a99d7b4?q=80&w=200' },
        { id: 3, name: 'Raw Silk (Grade A)', category: 'Finished Goods', price: '2,500.00', stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1606240217033-659f4258752c?q=80&w=200' },
        { id: 4, name: 'Bamboo Rearing Trays', category: 'Equipment', price: '450.00', stock: 45, status: 'In Stock', image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=200' },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-slate-800 leading-tight">Product Inventory</h2>}
        >
            <Head title="Products Management" />

            <div className="space-y-8">
                {/* --- HEADER ACTIONS --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto">
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">
                            All Products
                        </button>
                        <button className="px-6 py-2 text-slate-500 hover:text-indigo-600 rounded-xl text-sm font-bold transition">
                            Categories
                        </button>
                    </div>
                    
                    <div className="flex gap-3">
                        <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Export
                        </button>
                        <button className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            New Product
                        </button>
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                            {/* Image & Stock Badge */}
                            <div className="relative h-48 bg-slate-100">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                        product.status === 'In Stock' ? 'bg-green-500 text-white' : 
                                        product.status === 'Low Stock' ? 'bg-orange-500 text-white animate-pulse' : 
                                        'bg-red-500 text-white'
                                    }`}>
                                        {product.status}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{product.category}</span>
                                    <span className="text-xs font-bold text-slate-400">ID: #PROD-{product.id}00</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-1">{product.name}</h3>
                                
                                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl mb-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Price</p>
                                        <p className="text-lg font-black text-slate-900">₱{product.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Inventory</p>
                                        <p className={`text-lg font-black ${product.stock < 20 ? 'text-orange-600' : 'text-slate-900'}`}>{product.stock} <span className="text-xs font-medium text-slate-400 italic">pcs</span></p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                                        Edit Details
                                    </button>
                                    <button className="px-4 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- FOOTER INFO --- */}
                <div className="bg-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="relative z-10 text-center md:text-left">
                        <h4 className="text-xl font-bold mb-2">Need to restock inventory?</h4>
                        <p className="text-indigo-200 text-sm">You can generate a purchase request for supplies directly to the procurement office.</p>
                    </div>
                    <button className="relative z-10 px-8 py-3 bg-white text-indigo-900 rounded-2xl font-bold text-sm hover:scale-105 transition active:scale-95">
                        Create Purchase Request
                    </button>
                    {/* Abstract background shape */}
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-800 rounded-full opacity-50"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}