import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    is_available: boolean;
    sort_order: number;
    image_url: string | null;
    created_at: string;
}

interface Props {
    store: { id: number; name: string; category: string };
    products: { data: Product[]; links: any[]; meta: any };
    filters: { search?: string; category?: string };
}

export default function ProductsIndex({ store, products, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const applySearch = () => {
        router.get(route('admin.stores.products.index', store.id), { search }, { preserveState: true, replace: true });
    };

    const deleteProduct = (id: number) => {
        if (confirm('Delete this product?')) {
            router.delete(route('admin.stores.products.destroy', [store.id, id]));
        }
    };

    const toggleAvailability = (id: number) => {
        router.patch(route('admin.stores.products.toggle', [store.id, id]));
    };

    return (
        <>
            <Head title={`${store.name} Products — Admin`} />
            <AdminLayout title={`${store.name} — Products`}>
                <div className="mb-4">
                    <Link href={route('admin.stores.index')} className="text-sm text-gray-500 hover:text-quicky-yellow transition">← Back to Stores</Link>
                </div>

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">{products.meta?.total ?? 0} products in this store</p>
                    <Link
                        href={route('admin.stores.products.create', store.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-quicky-yellow px-4 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark transition"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-4 flex gap-3">
                    <input
                        type="text"
                        placeholder="Search products…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applySearch()}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow"
                    />
                    <button onClick={applySearch} className="rounded-xl bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition">Search</button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {['Product', 'Category', 'Price', 'Order', 'Available', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.data.length === 0 ? (
                                    <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                                        No products yet. <Link href={route('admin.stores.products.create', store.id)} className="text-quicky-yellow underline">Add the first one</Link>
                                    </td></tr>
                                ) : products.data.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {product.image_url
                                                    ? <img src={product.image_url} alt="" className="h-10 w-10 rounded-xl object-cover" />
                                                    : <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-quicky-yellow/20 text-lg">🍽️</div>
                                                }
                                                <div>
                                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                                    {product.description && <p className="max-w-xs truncate text-xs text-gray-400">{product.description}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{product.category ?? '—'}</td>
                                        <td className="px-4 py-3 font-semibold text-gray-800">Rs. {Number(product.price).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-gray-500">{product.sort_order}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => toggleAvailability(product.id)} className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${product.is_available ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                                                {product.is_available ? 'Available' : 'Unavailable'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link href={route('admin.stores.products.edit', [store.id, product.id])} className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition">Edit</Link>
                                                <button onClick={() => deleteProduct(product.id)} className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {products.meta?.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <p className="text-xs text-gray-500">Page {products.meta.current_page} of {products.meta.last_page}</p>
                            <div className="flex gap-1">
                                {products.links.map((link: any, i: number) => (
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
