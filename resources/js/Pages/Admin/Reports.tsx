import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    revenue: { date: string; revenue: number; orders: number }[];
    ordersByStatus: Record<string, number>;
    ordersByType: Record<string, number>;
    topStores: { store: string; revenue: number; orders: number }[];
    summary: {
        total_revenue: number;
        total_orders: number;
        delivered_orders: number;
        cancelled_orders: number;
        new_users: number;
        total_customers: number;
    };
    period: string;
}

const STATUS_COLORS: Record<string, string> = {
    placed:     'bg-blue-500',
    confirmed:  'bg-indigo-500',
    preparing:  'bg-yellow-500',
    picked_up:  'bg-orange-500',
    on_the_way: 'bg-purple-500',
    delivered:  'bg-green-500',
    cancelled:  'bg-red-500',
};

export default function Reports({ revenue, ordersByStatus, ordersByType, topStores, summary, period }: Props) {
    const [selectedPeriod, setSelectedPeriod] = useState(period);

    const changePeriod = (p: string) => {
        setSelectedPeriod(p);
        router.get(route('admin.reports'), { period: p }, { preserveState: true, replace: true });
    };

    const maxRevenue = Math.max(...revenue.map(r => r.revenue), 1);
    const totalStatusCount = Object.values(ordersByStatus).reduce((a, b) => a + b, 0) || 1;

    return (
        <>
            <Head title="Reports — Admin" />
            <AdminLayout title="Reports & Analytics">

                {/* Period selector */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {[
                        { label: '7 Days', value: '7' },
                        { label: '30 Days', value: '30' },
                        { label: '90 Days', value: '90' },
                    ].map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => changePeriod(opt.value)}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${selectedPeriod === opt.value ? 'bg-quicky-yellow text-quicky-black' : 'bg-white border border-gray-200 text-gray-600 hover:border-quicky-yellow'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {[
                        { label: 'Total Revenue',   value: `Rs. ${Number(summary.total_revenue).toLocaleString()}`, color: 'text-green-600',  bg: 'bg-green-50' },
                        { label: 'Total Orders',    value: summary.total_orders,    color: 'text-blue-600',   bg: 'bg-blue-50' },
                        { label: 'Delivered',       value: summary.delivered_orders, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Cancelled',       value: summary.cancelled_orders, color: 'text-red-600',   bg: 'bg-red-50' },
                        { label: 'New Users',       value: summary.new_users,       color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Total Customers', value: summary.total_customers,  color: 'text-gray-600',  bg: 'bg-gray-50' },
                    ].map(card => (
                        <div key={card.label} className={`rounded-2xl border border-gray-100 ${card.bg} p-4`}>
                            <p className={`text-xl font-extrabold ${card.color}`}>{card.value}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Revenue bar chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-5">Revenue & Orders (last {selectedPeriod} days)</h3>
                        {revenue.length === 0 ? (
                            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">No data for this period</div>
                        ) : (
                            <div className="flex items-end gap-1.5 h-40">
                                {revenue.map((day) => (
                                    <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                                        <div
                                            className="w-full bg-quicky-yellow rounded-t-lg transition-all hover:bg-quicky-yellow-dark"
                                            style={{ height: `${Math.max(4, (day.revenue / maxRevenue) * 100)}%` }}
                                            title={`Rs. ${day.revenue.toLocaleString()} · ${day.orders} orders`}
                                        />
                                        {/* Tooltip */}
                                        <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-10">
                                            {day.date}<br />Rs. {day.revenue.toLocaleString()}<br />{day.orders} orders
                                        </div>
                                        <span className="text-[10px] text-gray-400 truncate w-full text-center hidden sm:block">
                                            {day.date.slice(5)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Orders by status */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-5">Orders by Status</h3>
                        <div className="space-y-3">
                            {Object.entries(ordersByStatus).sort((a, b) => b[1] - a[1]).map(([status, count]) => (
                                <div key={status}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-600 capitalize">{status.replace('_', ' ')}</span>
                                        <span className="text-xs font-bold text-gray-800">{count}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${STATUS_COLORS[status] ?? 'bg-gray-400'}`}
                                            style={{ width: `${(count / totalStatusCount) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {Object.keys(ordersByStatus).length === 0 && (
                                <p className="text-sm text-gray-400 text-center py-4">No orders yet</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Orders by type + Top stores */}
                <div className="grid sm:grid-cols-2 gap-6 mt-6">

                    {/* By type */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-5">Orders by Type</h3>
                        <div className="space-y-3">
                            {Object.entries(ordersByType).map(([type, count]) => {
                                const total = Object.values(ordersByType).reduce((a, b) => a + b, 0) || 1;
                                const pct = Math.round((count / total) * 100);
                                const emoji: Record<string, string> = { food: '🍔', grocery: '🛒', medicine: '💊', parcel: '📦' };
                                return (
                                    <div key={type} className="flex items-center gap-3">
                                        <span className="text-xl">{emoji[type] ?? '📦'}</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-medium text-gray-600 capitalize">{type}</span>
                                                <span className="text-xs font-bold text-gray-800">{count} ({pct}%)</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-quicky-yellow rounded-full" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {Object.keys(ordersByType).length === 0 && (
                                <p className="text-sm text-gray-400 text-center py-4">No orders yet</p>
                            )}
                        </div>
                    </div>

                    {/* Top stores */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-5">Top Stores by Revenue</h3>
                        {topStores.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
                        ) : (
                            <div className="space-y-3">
                                {topStores.map((store, i) => (
                                    <div key={store.store} className="flex items-center gap-3">
                                        <div className="h-7 w-7 rounded-full bg-quicky-yellow/20 flex items-center justify-center text-xs font-black text-quicky-black shrink-0">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{store.store}</p>
                                            <p className="text-xs text-gray-500">{store.orders} orders</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-800 shrink-0">Rs. {store.revenue.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </AdminLayout>
        </>
    );
}
