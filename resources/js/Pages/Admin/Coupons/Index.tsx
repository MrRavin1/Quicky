import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Coupon {
    id: number;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    min_order: number | null;
    max_discount: number | null;
    usage_limit: number | null;
    used_count: number;
    is_active: boolean;
    expires_at: string | null;
    created_at: string;
}

interface Props {
    coupons: { data: Coupon[]; links: any[]; meta: any };
    filters: { search?: string };
}

export default function CouponsIndex({ coupons, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const applySearch = () => {
        router.get(route('admin.coupons.index'), { search }, { preserveState: true, replace: true });
    };

    const deleteCoupon = (id: number) => {
        if (confirm('Delete this coupon?')) {
            router.delete(route('admin.coupons.destroy', id));
        }
    };

    const toggleCoupon = (id: number) => {
        router.patch(route('admin.coupons.toggle', id));
    };

    return (
        <>
            <Head title="Coupons — Admin" />
            <AdminLayout title="Coupons">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">{coupons.meta?.total ?? 0} coupons total</p>
                    <Link
                        href={route('admin.coupons.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-quicky-yellow px-4 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark transition"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Coupon
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-4 flex gap-3">
                    <input
                        type="text"
                        placeholder="Search by code…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applySearch()}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow"
                    />
                    <button onClick={applySearch} className="rounded-xl bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition">
                        Search
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {['Code', 'Type', 'Value', 'Min Order', 'Used / Limit', 'Expires', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {coupons.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                                            No coupons yet.{' '}
                                            <Link href={route('admin.coupons.create')} className="text-quicky-yellow underline">Create one</Link>
                                        </td>
                                    </tr>
                                ) : coupons.data.map((coupon) => (
                                    <tr key={coupon.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <span className="font-mono font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-lg">
                                                {coupon.code}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${coupon.type === 'percentage' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {coupon.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-gray-800">
                                            {coupon.type === 'percentage' ? `${coupon.value}%` : `Rs. ${coupon.value}`}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {coupon.min_order ? `Rs. ${coupon.min_order}` : '—'}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {coupon.used_count} / {coupon.usage_limit ?? '∞'}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">
                                            {coupon.expires_at ?? 'No expiry'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${coupon.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {coupon.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('admin.coupons.edit', coupon.id)}
                                                    className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => toggleCoupon(coupon.id)}
                                                    className="rounded-lg bg-yellow-50 px-2.5 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-100 transition"
                                                >
                                                    {coupon.is_active ? 'Disable' : 'Enable'}
                                                </button>
                                                <button
                                                    onClick={() => deleteCoupon(coupon.id)}
                                                    className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {coupons.meta?.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <p className="text-xs text-gray-500">Page {coupons.meta.current_page} of {coupons.meta.last_page}</p>
                            <div className="flex gap-1">
                                {coupons.links.map((link: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={link.url ?? '#'}
                                        preserveState
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${link.active ? 'bg-quicky-yellow text-quicky-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </>
    );
}
