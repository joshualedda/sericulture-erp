import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function InventoryIndex() {
    const inventory = [
        { id: 1, item: 'Mulberry Leaves', sku: 'ML-001', stock: 450, unit: 'kg', warehouse: 'A-1', lastUpdate: '2h ago' },
        { id: 2, item: 'Cocoon Harvest', sku: 'CH-202', stock: 120, unit: 'kg', warehouse: 'B-3', lastUpdate: '5h ago' },
        { id: 3, item: 'Disinfectant Solution', sku: 'DS-99', stock: 15, unit: 'L', warehouse: 'A-2', lastUpdate: '1d ago' },
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-bold text-xl text-slate-800">Stock Control</h2>}>
            <Head title="Inventory" />
            
            <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-[2rem] border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">All Stock</button>
                        <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-xl text-xs font-bold transition">Low Stock</button>
                    </div>
                    <input type="text" placeholder="Search SKU or Item..." className="bg-slate-50 border-none rounded-xl text-sm w-full md:w-64 focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Item & SKU</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Stock Level</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Location</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Adjust Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inventory.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-slate-900">{item.item}</p>
                                        <p className="text-[10px] font-black text-indigo-500 uppercase">{item.sku}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-lg font-black ${item.stock < 20 ? 'text-rose-500' : 'text-slate-900'}`}>{item.stock}</span>
                                            <span className="text-xs font-bold text-slate-400 uppercase">{item.unit}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1 italic">Updated {item.lastUpdate}</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-slate-600">Section {item.warehouse}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end gap-2">
                                            <button className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-rose-100 hover:text-rose-600 rounded-xl transition font-black">-</button>
                                            <button className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 rounded-xl transition font-black">+</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}