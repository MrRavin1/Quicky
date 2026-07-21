import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Stats {
    total_orders: number;
    pending_orders: number;
    active_riders: number;
    total_stores: number;
    total_customers: number;
    todays_orders: number;
    todays_revenue: number;
    pending_riders: number;
}

interface RecentOrder {
    id: number;
    customer: string;
    store: string;
    type: string;
    status: string;
    total_amount: number;
    created_at: string;
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

export default function Dashboard({ stats, recent_orders }: { stats: Stats; recent_orders: RecentOrder[] }) {
    const statCards = [
        { label: "Today's Orders",   value: stats.todays_orders,   icon: '🛍️', color: 'bg-blue-50 border-blue-200' },
        { label: "Today's Revenue",  value: `Rs. ${Number(stats.todays_revenue).toLocaleString()}`, icon: '💰', color: 'bg-green-50 border-green-200' },
        { label: 'Pending Orders',   value: stats.pending_orders,  icon: '⏳', color: 'bg-yellow-50 border-yellow-200' },
        { label: 'Active Riders',    value: stats.active_riders,   icon: '🏍️', color: 'bg-purple-50 border-purple-200' },
        { label: 'Total Stores',     value: stats.total_stores,    icon: '🏪', color: 'bg-orange-50 border-orange-200' },
        { label: 'Total Customers',  value: stats.total_customers, icon: '👥', color: 'bg-pink-50 border-pink-200' },
        { label: 'Total Orders',     value: stats.total_orders,    icon: '📦', color: 'bg-gray-50 border-gray-200' },
        { label: 'Pending Riders',   value: stats.pending_riders,  icon: '🔔', color: 'bg-red-50 border-red-200' },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />
            <AdminLayout title="Dashboard">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {statCards.map((card) => (
                        <div key={card.label} className={`rounded-2xl border p-4 ${card.color}`}>
                            <p className="text-2xl">{card.icon}</p>
                            <p className="mt-2 text-2xl font-extrabold text-gray-800">{card.value}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{card.label}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-base font-bold text-gray-800">Recent Orders</h2>
                        <Link href={route('admin.orders.index')} className="text-sm font-medium text-quicky-yellow hover:underline">
                            View all →
                        </Link>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-gray-100 bg-gray-50">
                                    <tr>
                                        {['#ID', 'Customer', 'Store', 'Type', 'Status', 'Amount', 'Time'].map(h => (
                                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recent_orders.length === 0 ? (
                                        <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No orders yet</td></tr>
                                    ) : recent_orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order.id}</td>
                                            <td className="px-4 py-3 font-medium text-gray-800">{order.customer}</td>
                                            <td className="px-4 py-3 text-gray-600">{order.store ?? '—'}</td>
                                            <td className="px-4 py-3 capitalize text-gray-600">{order.type}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-800">Rs. {Number(order.total_amount).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-gray-400">{order.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Add New Store', href: route('admin.stores.create'), icon: '🏪' },
                        { label: 'Add New Rider', href: route('admin.riders.create'), icon: '🏍️' },
                        { label: 'View All Orders', href: route('admin.orders.index'), icon: '📦' },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 font-medium text-gray-700 hover:border-quicky-yellow hover:text-quicky-yellow transition"
                        >
                            <span className="text-2xl">{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </AdminLayout>
        </>
    );
}
