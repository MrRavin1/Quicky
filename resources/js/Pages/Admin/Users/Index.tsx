import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface User { id: number; name: string; email: string; phone: string; role: string; created_at: string; }
interface Props {
    users: { data: User[]; links: any[]; meta: any };
    filters: { search?: string; role?: string };
}

const ROLE_BADGE: Record<string, string> = {
    admin:    'bg-purple-100 text-purple-700',
    rider:    'bg-blue-100 text-blue-700',
    customer: 'bg-gray-100 text-gray-700',
};

export default function UsersIndex({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [role, setRole] = useState(filters.role ?? '');

    const applyFilters = (r = role) => {
        router.get(route('admin.users.index'), { search, role: r }, { preserveState: true, replace: true });
    };

    const deleteUser = (id: number) => {
        if (confirm('Delete this user? This cannot be undone.')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <>
            <Head title="Users — Admin" />
            <AdminLayout title="Users">
                <div className="mb-6">
                    <p className="text-sm text-gray-500">{users.meta?.total ?? 0} users total</p>
                </div>

                <div className="mb-4 flex flex-wrap gap-3">
                    <input type="text" placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyFilters()} className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow" />
                    {['', 'customer', 'rider', 'admin'].map((r) => (
                        <button key={r} onClick={() => { setRole(r); applyFilters(r); }} className={`rounded-xl px-3 py-2 text-sm font-medium transition ${role === r ? 'bg-quicky-yellow text-quicky-black' : 'bg-white border border-gray-200 text-gray-600 hover:border-quicky-yellow'}`}>
                            {r === '' ? 'All' : r.charAt(0).toUpperCase() + r.slice(1) + 's'}
                        </button>
                    ))}
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {['Name', 'Email', 'Phone', 'Role', 'Joined', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.data.length === 0 ? (
                                    <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No users found.</td></tr>
                                ) : users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-quicky-yellow/20 text-sm font-bold text-quicky-black">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-800">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                        <td className="px-4 py-3 text-gray-600">{user.phone ?? '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${ROLE_BADGE[user.role] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{user.created_at}</td>
                                        <td className="px-4 py-3">
                                            {user.role !== 'admin' && (
                                                <button onClick={() => deleteUser(user.id)} className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {users.meta?.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <p className="text-xs text-gray-500">Page {users.meta.current_page} of {users.meta.last_page}</p>
                            <div className="flex gap-1">
                                {users.links.map((link: any, i: number) => (
                                    <Link key={i} href={link.url ?? '#'} preserveState className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${link.active ? 'bg-quicky-yellow text-quicky-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </>
    );
}
