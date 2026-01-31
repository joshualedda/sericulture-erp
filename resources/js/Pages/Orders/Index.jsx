import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Receipt from '@/Components/Receipt';
import axios from 'axios';

export default function Index({ orders }) {
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [loadingId, setLoadingId] = useState(null); // Track specific order loading

    const handleViewReceipt = async (orderId) => {
        setLoadingId(orderId);
        try {
            const response = await axios.get(`/api/orders/${orderId}/receipt`);
            setSelectedReceipt(response.data.receipt);
        } catch (error) {
            console.error('Error fetching receipt:', error);
            alert('Failed to load receipt. Please try again.');
        } finally {
            setLoadingId(null);
        }
    };

    // Helper para sa status colors
    const getStatusStyles = (status) => {
        const styles = {
            completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            pending: 'bg-amber-50 text-amber-700 border-amber-100',
            'in-process': 'bg-blue-50 text-blue-700 border-blue-100',
            cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
        };
        return styles[status] || 'bg-gray-50 text-gray-700 border-gray-100';
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Orders" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
                            <p className="text-slate-500 mt-1">Manage and track your SRDI facility pickups.</p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-lg text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <p className="text-xs text-indigo-900 leading-tight">
                                <span className="font-bold block uppercase tracking-wider text-[10px]">Onsite Pickup Only</span>
                                Pick up your orders at the SRDI facility once notified.
                            </p>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No orders found</h3>
                            <p className="text-slate-500 max-w-xs mx-auto mt-2">Looks like you haven't placed any orders yet. Start shopping to see them here!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:border-indigo-200 transition-all">
                                    {/* Order Top Bar */}
                                    <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Order #{order.id}</span>
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-tighter border rounded-full ${getStatusStyles(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-500 font-medium">
                                            Order Date: <span className="text-slate-900">{new Date(order.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                            <div className="lg:col-span-8 space-y-4">
                                                {order.order_items.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-4 group">
                                                        <div className="flex-shrink-0 w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                                                            {item.product.image_urls?.[0] ? (
                                                                <img src={item.product.image_urls[0]} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">No Image</div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h5 className="text-sm font-bold text-slate-900 truncate">{item.product.name}</h5>
                                                            <p className="text-xs text-slate-500">Qty: {item.quantity} × ₱{item.price}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-black text-slate-900">₱{(item.quantity * item.price).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Order Actions & Summary */}
                                            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 flex flex-col justify-between">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                                                    <p className="text-2xl font-black text-indigo-600">₱{parseFloat(order.total_amount).toLocaleString()}</p>
                                                </div>

                                                <div className="mt-6 flex flex-col gap-2">
                                                    {order.status === 'completed' && (
                                                        <button
                                                            onClick={() => handleViewReceipt(order.id)}
                                                            disabled={loadingId === order.id}
                                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                                        >
                                                            {loadingId === order.id ? (
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            ) : (
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                            )}
                                                            View E-Receipt
                                                        </button>
                                                    )}
                                                    
                                                    <button className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors">
                                                        Order Details
                                                    </button>

                                                    {order.status === 'pending' && (
                                                        <button className="w-full px-4 py-2.5 text-rose-600 text-[11px] font-bold hover:bg-rose-50 rounded-xl transition-colors">
                                                            Cancel Order
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedReceipt && (
                <Receipt
                    receipt={selectedReceipt}
                    onClose={() => setSelectedReceipt(null)}
                />
            )}
        </AuthenticatedLayout>
    );
}