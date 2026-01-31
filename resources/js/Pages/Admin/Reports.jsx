import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminReports() {
    // Dummy Data for Recent Generated Reports
    const recentReports = [
        { id: 1, name: 'Monthly Sales Summary', date: 'Jan 30, 2026', type: 'Excel', size: '2.4 MB', status: 'Ready' },
        { id: 2, name: 'Inventory Stock Valuation', date: 'Jan 28, 2026', type: 'PDF', size: '1.1 MB', status: 'Ready' },
        { id: 3, name: 'Customer Order History', date: 'Jan 25, 2026', type: 'Excel', size: '4.8 MB', status: 'Archived' },
    ];

    const reportCategories = [
        { title: 'Sales & Revenue', icon: '💰', desc: 'Detailed transaction logs and income statements.' },
        { title: 'Inventory Levels', icon: '📦', desc: 'Current stock value and replenishment reports.' },
        { title: 'User Activities', icon: '👥', desc: 'Staff logs and system interaction reports.' },
        { title: 'Research Data', icon: '🔬', desc: 'Silk yield statistics and biological growth logs.' },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-slate-800 leading-tight">Reports & Analytics</h2>}
        >
            <Head title="System Reports" />

            <div className="space-y-8">
                {/* --- EXPORT SECTIONS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reportCategories.map((cat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="text-3xl mb-4">{cat.icon}</div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{cat.title}</h3>
                            <p className="text-xs text-slate-500 mb-6 leading-relaxed">{cat.desc}</p>
                            
                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    Excel
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 9h1m0 4h3m-3 4h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- QUICK GENERATOR --- */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-black mb-2">Custom Report Generator</h3>
                            <p className="text-slate-400 text-sm">Select a date range and specific module to generate a filtered export.</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <input type="date" className="bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 px-4 py-3" />
                            <span className="flex items-center text-slate-500">to</span>
                            <input type="date" className="bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 px-4 py-3" />
                            <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-indigo-900/50">
                                Generate Now
                            </button>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                </div>

                {/* --- RECENTLY GENERATED TABLE --- */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Downloads</h4>
                        <button className="text-xs font-bold text-indigo-600 hover:underline">Clear History</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Name</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Created</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Format</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${report.type === 'Excel' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {report.type === 'Excel' ? 'XL' : 'PDF'}
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{report.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-slate-500">{report.date}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-black uppercase tracking-tighter">
                                                {report.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400">{report.size}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-600 hover:text-indigo-900 font-bold text-xs flex items-center gap-1 ml-auto">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}