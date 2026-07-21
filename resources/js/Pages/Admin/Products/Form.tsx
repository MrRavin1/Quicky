import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    store: { id: number; name: string };
    product: {
        id?: number; name: string; description: string; price: string;
        category: string; is_available: boolean; sort_order: number; image_url?: string | null;
    } | null;
}

export default function ProductForm({ store, product }: Props) {
    const isEdit = !!product?.id;

    const { data, setData, post, processing, errors } = useForm<Record<string, any>>({
        name:         product?.name ?? '',
        description:  product?.description ?? '',
        price:        product?.price ?? '',
        category:     product?.category ?? '',
        is_available: product?.is_available ?? true,
        sort_order:   product?.sort_order ?? 0,
        image:        null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.stores.products.update', [store.id, product!.id]));
        } else {
            post(route('admin.stores.products.store', store.id));
        }
    };

    const inputCls = (err?: string) =>
        `w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-quicky-yellow ${err ? 'border-red-400' : 'border-gray-200'}`;

    const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );

    return (
        <>
            <Head title={isEdit ? 'Edit Product' : 'Add Product'} />
            <AdminLayout title={`${store.name} — ${isEdit ? 'Edit' : 'Add'} Product`}>
                <div className="max-w-xl">
                    <div className="mb-4">
                        <Link href={route('admin.stores.products.index', store.id)} className="text-sm text-gray-500 hover:text-quicky-yellow transition">← Back to Products</Link>
                    </div>

                    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6" encType="multipart/form-data">
                        <Field label="Product Name *" error={errors.name}>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={inputCls(errors.name)} placeholder="e.g. Chicken Momo (8 pcs)" />
                        </Field>

                        <Field label="Description" error={errors.description}>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className={inputCls(errors.description)} placeholder="Short description…" />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Price (Rs.) *" error={errors.price}>
                                <input type="number" min="0" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className={inputCls(errors.price)} placeholder="0.00" />
                            </Field>
                            <Field label="Category / Section" error={errors.category}>
                                <input type="text" value={data.category} onChange={e => setData('category', e.target.value)} className={inputCls(errors.category)} placeholder="e.g. Momo, Drinks, Snacks" />
                            </Field>
                        </div>

                        <Field label="Sort Order (lower = shown first)" error={errors.sort_order}>
                            <input type="number" min="0" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} className={inputCls(errors.sort_order)} />
                        </Field>

                        <Field label="Product Image" error={errors.image}>
                            {product?.image_url && <img src={product.image_url} alt="Current" className="mb-2 h-20 w-20 rounded-xl object-cover" />}
                            <input type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-quicky-yellow file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-quicky-black" />
                        </Field>

                        <label className="flex cursor-pointer items-center gap-2.5">
                            <div className="relative">
                                <input type="checkbox" checked={data.is_available} onChange={e => setData('is_available', e.target.checked)} className="sr-only" />
                                <div className={`h-6 w-11 rounded-full transition ${data.is_available ? 'bg-quicky-yellow' : 'bg-gray-300'}`} />
                                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${data.is_available ? 'translate-x-5' : 'translate-x-0.5'}`} />
                            </div>
                            <span className="text-sm text-gray-700">Available for ordering</span>
                        </label>

                        <div className="flex items-center gap-3 pt-2">
                            <button type="submit" disabled={processing} className="rounded-xl bg-quicky-yellow px-6 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition">
                                {processing ? 'Saving…' : isEdit ? 'Update Product' : 'Add Product'}
                            </button>
                            <Link href={route('admin.stores.products.index', store.id)} className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
