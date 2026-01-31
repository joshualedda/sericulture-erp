import React, { useEffect, useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Storefront({ auth }) {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [cartCount, setCartCount] = useState(0);

    // Dummy Data for Products if API is empty
    const dummyProducts = [
        { id: 1, name: 'Hybrid Silkworm Eggs', category: 'Biological', price: '500', description: 'High-yield bivoltine hybrid eggs certified by SRDI.', image_urls: ['https://images.unsplash.com/photo-1626078436897-095208993457?q=80&w=500'] },
        { id: 2, name: 'Mulberry Saplings', category: 'Planting', price: '25', description: 'Improved S-1 variety saplings for optimal leaf production.', image_urls: ['https://images.unsplash.com/photo-1592150621344-82454a99d7b4?q=80&w=500'] },
        { id: 3, name: 'Raw Silk Skeins', category: 'Finished Goods', price: '2500', description: 'Grade A raw silk reeled from premium cocoons.', image_urls: ['https://images.unsplash.com/photo-1606240217033-659f4258752c?q=80&w=500'] },
        { id: 4, name: 'Rearing Trays', category: 'Equipment', price: '450', description: 'Stackable bamboo-style trays for silkworm rearing.', image_urls: ['https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=500'] },
    ];

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if(data && data.length > 0) setProducts(data);
                else setProducts(dummyProducts);
            })
            .catch(() => setProducts(dummyProducts));
    }, []);

    const categories = useMemo(() => {
        const cats = products.map(p => p.category).filter(Boolean);
        return ['All', ...new Set(cats)];
    }, [products]);

    const filtered = products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        return matchesQuery && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Head title="D'SERICORE-ERP | Premium Sericulture" />

            {/* --- NAVIGATION --- */}
            <nav className="bg-white/90 backdrop-blur-lg border-b sticky top-0 z-[100]">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-white rounded-md p-1">
                                <ApplicationLogo className="h-10 w-auto" />
                            </div>
                            <div className="hidden sm:flex flex-col leading-tight">
                                <span className="text-lg font-extrabold text-slate-900">D'SERICORE</span>
                                <span className="text-xs font-semibold text-indigo-500 tracking-[0.2em]">ERP SYSTEM</span>
                            </div>
                        </Link>

                        <div className="hidden lg:flex relative w-80">
                            <div className="absolute left-2 top-1.5 bg-white rounded-full p-0.5">
                                <ApplicationLogo className="h-5 w-5" />
                            </div>
                            <input
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search inventory..."
                                className="w-full bg-gray-100 border-none rounded-full pl-12 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
                            <Link href="#" className="hover:text-indigo-600">Products</Link>
                            <Link href="#" className="hover:text-indigo-600">Research</Link>
                            <Link href={route('orders.index')} className="hover:text-indigo-600">Track Order</Link>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
                        <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition">
                            <span className="text-xl">🛒</span>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="bg-indigo-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 hover:scale-105 transition">Portal</Link>
                        ) : (
                            <Link href={route('login')} className="text-indigo-900 font-bold text-sm">Sign In</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* --- AUTO-CAROUSEL --- */}
            <header className="w-full overflow-hidden">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: true, // Titigil ang auto kapag clinick ang product (interaction)
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="h-[450px] lg:h-[600px]"
                >
                    <SwiperSlide>
                        <div className="relative w-full h-full bg-slate-900">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center text-white">
                                <span className="uppercase tracking-[0.3em] text-indigo-400 font-bold mb-4 block">New Arrivals 2026</span>
                                <h1 className="text-5xl lg:text-7xl font-black mb-6 max-w-2xl leading-[1.1]">Premium Silk Production.</h1>
                                <p className="text-lg text-gray-300 max-w-lg mb-8">Direct access to the Sericulture Research and Development Institute's certified product line.</p>
                                <div className="flex gap-4">
                                    <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-full font-bold transition">Shop Now</button>
                                    <div className="flex items-center gap-2 text-sm font-bold border border-white/30 px-6 py-4 rounded-full backdrop-blur-sm">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> ONSITE PICKUP ONLY
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full bg-indigo-900">
                            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center text-white text-center items-center">
                                <h2 className="text-5xl font-black mb-6 italic">Support Local Farmers</h2>
                                <p className="text-xl text-indigo-100 max-w-2xl mb-8">Our ERP system connects research-grade inputs directly to sericulture practitioners across the region.</p>
                                <button className="bg-white text-indigo-900 px-10 py-4 rounded-full font-bold">Learn More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-16 w-full">
                {/* --- CATEGORIES --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900">Available Inventory</h2>
                        <p className="text-slate-500">Real-time stock from the SRDI Research Center</p>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                                    activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filtered.map(product => (
                        <div 
                            key={product.id} 
                            onClick={() => setCartCount(c => c + 1)} // Stimulate interaction to stop carousel
                            className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-slate-100"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-6">
                                <img src={product.image_urls[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            </div>
                            <div className="px-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{product.category}</span>
                                <h3 className="text-lg font-bold text-slate-900 mt-1 line-clamp-1">{product.name}</h3>
                                <p className="text-slate-500 text-xs mt-2 line-clamp-2 h-8 leading-relaxed">{product.description}</p>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-2xl font-black text-slate-900">₱{product.price}</span>
                                    <div className="bg-slate-900 text-white p-2 rounded-xl group-hover:bg-indigo-600 transition">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-800">Onsite pickup only</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- FOOTER WITH DUMMY DATA --- */}
            <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <h3 className="text-white text-2xl font-black mb-6 tracking-tighter">D'SERICORE-ERP</h3>
                        <p className="text-sm leading-relaxed mb-6">
                            The official Enterprise Resource Planning and Storefront system of the 
                            <strong> Sericulture Research and Development Institute (SRDI)</strong>. 
                            Advancing the silk industry through technology and research.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-indigo-400 transition">About the Institute</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Product Catalog</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Research Journals</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Public Bidding</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact Details</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span>📍</span>
                                <span>SRDI Building, DMMMSU-NLUC Campus,<br/>Bacnotan, La Union, Philippines 2515</span>
                            </li>
                            <li className="flex gap-3">
                                <span>📞</span>
                                <span>+63 (072) 607-4308</span>
                            </li>
                            <li className="flex gap-3">
                                <span>✉️</span>
                                <span>info.srdi@dmmmsu.edu.ph</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Operating Hours</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">8:00 AM - 5:00 PM</span></li>
                            <li className="flex justify-between"><span>Sat - Sun</span> <span className="text-red-400">Closed (Onsite Pickup Only)</span></li>
                            <li className="mt-6 p-4 bg-slate-800 rounded-2xl border border-slate-700">
                                <p className="text-[10px] leading-tight opacity-70 italic">
                                    Note: Online orders must be confirmed before proceeding to the facility for pickup.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium opacity-50">
                    <p>© 2026 D'SERICORE-ERP System. All rights reserved. Onsite pickup only — please select pickup at checkout. For bulk or institutional orders, contact our support.</p>
                    <div className="flex gap-8">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">System Status</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}