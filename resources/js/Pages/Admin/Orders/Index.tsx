import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Order {
    id: number; customer: string; store: string | null; rider: string | null;
    type: string; status: string; total_amount: number;
    payment_method: string; payment_status: string;
    delivery_address: string; created_at: string;
}
interface Props {
    orders: { data: Order[]; links: any[]; meta: any };
    filters: { search?: string; status?: string; type?: string };
}

const STATUS_COLORS: Record<string, string> = {
    placed:     'bg-blue-100 text-blue-700',
    confirmed:  'bg-indigo-100 text-indigo-700',
    preparing:  'bg-yellow-100 text-yellow-700',
    picked_up:  'bg-orange-100 text-orange-700',
    on_the_way: 'bg-purple-100 text-purple-700',
    delivered:  'bg-green-100 text-green-700',
    cancelled:  'bg-red-100 text-red-700',
};

export default function OrdersIndex({ orders, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [type, setType] = useState(filters.type ?? '');

    const applyFilters = (s = status, t = type) => {
        router.get(route('admin.orders.index'), { search, status: s, type: t }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Orders — Admin" />
            <AdminLayout title="Orders">
                <div className="mb-6">
                    <p className="text-sm text-gray-500">{orders.meta?.total ?? 0} total orders</p>
                </div>

                {/* Filters */}
                <div className="mb-4 flex flex-wrap gap-3">
                    <input type="text" placeholder="Search customer…" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyFilters()} className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow" />
                    <select value={status} onChange={e => { setStatus(e.target.value); applyFilters(e.target.value, type); }} className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow">
                        <option value="">All Statuses</option>
                        {['placed','confirmed','preparing','picked_up','on_the_way','delivered','cancelled'].map(s => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                    </select>
                    <select value={type} onChange={e => { setType(e.target.value); applyFilters(status, e.target.value); }} className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow">
                        <option value="">All Types</option>
                        {['food','grocery','medicine','parcel'].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {['#', 'Customer', 'Store', 'Type', 'Status', 'Amount', 'Payment', 'Date', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.data.length === 0 ? (
                                    <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400">No orders found.</td></tr>
                                ) : orders.data.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order.id}</td>
                                        <td className="px-4 py-3 font-medium text-gray-800">{order.customer}</td>
                                        <td className="px-4 py-3 text-gray-600">{order.store ?? '—'}</td>
                                        <td className="px-4 py-3 capitalize text-gray-600">{order.type}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {order.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-gray-800">Rs. {Number(order.total_amount).toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : order.payment_status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {order.payment_status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-400">{order.created_at}</td>
                                        <td className="px-4 py-3">
                                            <Link href={route('admin.orders.show', order.id)} className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {orders.meta?.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <p className="text-xs text-gray-500">Page {orders.meta.current_page} of {orders.meta.last_page}</p>
                            <div className="flex gap-1">
                                {orders.links.map((link: any, i: number) => (
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
