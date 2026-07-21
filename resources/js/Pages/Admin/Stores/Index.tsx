import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Store {
    id: number;
    name: string;
    category: string;
    address: string;
    city: string;
    is_open: boolean;
    is_featured: boolean;
    is_active: boolean;
    products_count: number;
    delivery_fee: number;
    estimated_delivery_minutes: number;
    logo: string | null;
    created_at: string;
}

interface Props {
    stores: { data: Store[]; links: any[]; meta: any };
    filters: { search?: string; category?: string };
}

const CATEGORY_BADGE: Record<string, string> = {
    food:     'bg-orange-100 text-orange-700',
    grocery:  'bg-green-100 text-green-700',
    medicine: 'bg-blue-100 text-blue-700',
};

export default function StoresIndex({ stores, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');

    const applyFilters = () => {
        router.get(route('admin.stores.index'), { search, category }, { preserveState: true, replace: true });
    };

    const deleteStore = (id: number) => {
        if (confirm('Delete this store? All its products will also be removed.')) {
            router.delete(route('admin.stores.destroy', id));
        }
    };

    const toggleStatus = (id: number) => {
        router.patch(route('admin.stores.toggle-status', id));
    };

    return (
        <>
            <Head title="Stores — Admin" />
            <AdminLayout title="Stores">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">{stores.meta?.total ?? 0} stores total</p>
                    <Link
                        href={route('admin.stores.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-quicky-yellow px-4 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark transition"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Store
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-4 flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Search stores…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow"
                    />
                    <select
                        value={category}
                        onChange={e => { setCategory(e.target.value); router.get(route('admin.stores.index'), { search, category: e.target.value }, { preserveState: true, replace: true }); }}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow"
                    >
                        <option value="">All Categories</option>
                        <option value="food">Food</option>
                        <option value="grocery">Grocery</option>
                        <option value="medicine">Medicine</option>
                    </select>
                    <button onClick={applyFilters} className="rounded-xl bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition">
                        Search
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {['Store', 'Category', 'City', 'Products', 'Delivery Fee', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stores.data.length === 0 ? (
                                    <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No stores found. <Link href={route('admin.stores.create')} className="text-quicky-yellow underline">Add one</Link></td></tr>
                                ) : stores.data.map((store) => (
                                    <tr key={store.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-quicky-yellow/20 text-sm font-bold text-quicky-black">
                                                    {store.logo
                                                        ? <img src={store.logo} alt="" className="h-9 w-9 rounded-xl object-cover" />
                                                        : store.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{store.name}</p>
                                                    <p className="text-xs text-gray-400">{store.estimated_delivery_minutes} min</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${CATEGORY_BADGE[store.category] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {store.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{store.city}</td>
                                        <td className="px-4 py-3">
                                            <Link href={route('admin.stores.products.index', store.id)} className="font-semibold text-quicky-yellow hover:underline">
                                                {store.products_count} items
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">Rs. {store.delivery_fee}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-1">
                                                <span className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${store.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {store.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                                <span className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${store.is_open ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {store.is_open ? 'Open' : 'Closed'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link href={route('admin.stores.products.index', store.id)} className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition" title="Manage Products">Products</Link>
                                                <Link href={route('admin.stores.edit', store.id)} className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition">Edit</Link>
                                                <button onClick={() => toggleStatus(store.id)} className="rounded-lg bg-yellow-50 px-2.5 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-100 transition">
                                                    {store.is_active ? 'Disable' : 'Enable'}
                                                </button>
                                                <button onClick={() => deleteStore(store.id)} className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {stores.meta?.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <p className="text-xs text-gray-500">Page {stores.meta.current_page} of {stores.meta.last_page}</p>
                            <div className="flex gap-1">
                                {stores.links.map((link: any, i: number) => (
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
