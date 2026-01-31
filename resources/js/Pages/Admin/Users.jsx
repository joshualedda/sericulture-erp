import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminUsers() {
    // Dummy Data for the User Table
    const users = [
        { id: 1, name: 'Juan Dela Cruz', email: 'juan@srdi.com', role: 'admin', status: 'active', joined: 'Jan 12, 2026' },
        { id: 2, name: 'Maria Santos', email: 'maria.s@srdi.com', role: 'staff', status: 'active', joined: 'Jan 15, 2026' },
        { id: 3, name: 'Roberto Reyes', email: 'roberto@gmail.com', role: 'customer', status: 'inactive', joined: 'Jan 20, 2026' },
        { id: 4, name: 'Elena Garcia', email: 'elena.g@srdi.com', role: 'staff', status: 'active', joined: 'Jan 22, 2026' },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-slate-800 leading-tight">User Management</h2>}
        >
            <Head title="System Users" />

            <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Users</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-2">1,284</h3>
                        <p className="text-xs text-green-500 font-bold mt-2">↑ 12% from last month</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Now</p>
                        <h3 className="text-3xl font-black text-indigo-600 mt-2">42</h3>
                        <p className="text-xs text-slate-400 font-bold mt-2">Currently in the portal</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">New Requests</p>
                        <h3 className="text-3xl font-black text-orange-500 mt-2">8</h3>
                        <p className="text-xs text-slate-400 font-bold mt-2">Pending account approvals</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    {/* Table Header/Actions */}
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-96">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search by name, email or role..." 
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Add New User
                        </button>
                    </div>

                    {/* Desktop Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">User</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Role</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date Joined</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100 group-hover:scale-110 transition">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                                    <p className="text-xs text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600 uppercase tracking-tighter">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${
                                                user.role === 'admin' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 
                                                user.role === 'staff' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                                                'bg-slate-50 text-slate-600 border border-slate-200'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                                <span className="text-xs font-bold text-slate-600 capitalize">{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-slate-500">
                                            {user.joined}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-indigo-600 transition shadow-sm hover:shadow-md">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-red-100 text-slate-400 hover:text-red-600 transition shadow-sm hover:shadow-md">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="p-6 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing 4 of 1,284 users</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Previous</button>
                            <button className="px-4 py-2 bg-indigo-600 border border-indigo-600 rounded-lg text-xs font-bold text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}