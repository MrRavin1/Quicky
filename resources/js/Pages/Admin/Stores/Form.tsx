import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface StoreData {
    id?: number;
    name: string;
    category: string;
    description: string;
    address: string;
    city: string;
    phone: string;
    is_open: boolean;
    is_featured: boolean;
    is_active: boolean;
    delivery_fee: string;
    estimated_delivery_minutes: string;
    logo_url?: string | null;
    cover_image_url?: string | null;
}

interface Props {
    store: StoreData | null;
}

export default function StoreForm({ store }: Props) {
    const isEdit = !!store?.id;

    const { data, setData, post, processing, errors } = useForm<Record<string, any>>({
        name:                        store?.name ?? '',
        category:                    store?.category ?? 'food',
        description:                 store?.description ?? '',
        address:                     store?.address ?? '',
        city:                        store?.city ?? 'Jhapa',
        phone:                       store?.phone ?? '',
        is_open:                     store?.is_open ?? true,
        is_featured:                 store?.is_featured ?? false,
        is_active:                   store?.is_active ?? true,
        delivery_fee:                store?.delivery_fee ?? '50',
        estimated_delivery_minutes:  store?.estimated_delivery_minutes ?? '30',
        logo:                        null as File | null,
        cover_image:                 null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.stores.update', store!.id));
        } else {
            post(route('admin.stores.store'));
        }
    };

    const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );

    const inputCls = (err?: string) =>
        `w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-quicky-yellow ${err ? 'border-red-400' : 'border-gray-200'}`;

    return (
        <>
            <Head title={isEdit ? 'Edit Store' : 'Add Store'} />
            <AdminLayout title={isEdit ? 'Edit Store' : 'Add New Store'}>
                <div className="max-w-2xl">
                    <div className="mb-4">
                        <Link href={route('admin.stores.index')} className="text-sm text-gray-500 hover:text-quicky-yellow transition">← Back to Stores</Link>
                    </div>

                    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6" encType="multipart/form-data">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Store Name *" error={errors.name}>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={inputCls(errors.name)} placeholder="e.g. Momo House" />
                            </Field>

                            <Field label="Category *" error={errors.category}>
                                <select value={data.category} onChange={e => setData('category', e.target.value)} className={inputCls(errors.category)}>
                                    <option value="food">🍔 Food</option>
                                    <option value="grocery">🛒 Grocery</option>
                                    <option value="medicine">💊 Medicine</option>
                                </select>
                            </Field>
                        </div>

                        <Field label="Description" error={errors.description}>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className={inputCls(errors.description)} placeholder="Short description of the store…" />
                        </Field>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Address *" error={errors.address}>
                                <input type="text" value={data.address} onChange={e => setData('address', e.target.value)} className={inputCls(errors.address)} placeholder="Street address" />
                            </Field>
                            <Field label="City" error={errors.city}>
                                <input type="text" value={data.city} onChange={e => setData('city', e.target.value)} className={inputCls(errors.city)} />
                            </Field>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Phone" error={errors.phone}>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className={inputCls(errors.phone)} placeholder="98XXXXXXXX" />
                            </Field>
                            <Field label="Delivery Fee (Rs.) *" error={errors.delivery_fee}>
                                <input type="number" min="0" value={data.delivery_fee} onChange={e => setData('delivery_fee', e.target.value)} className={inputCls(errors.delivery_fee)} />
                            </Field>
                        </div>

                        <Field label="Estimated Delivery Time (minutes) *" error={errors.estimated_delivery_minutes}>
                            <input type="number" min="1" value={data.estimated_delivery_minutes} onChange={e => setData('estimated_delivery_minutes', e.target.value)} className={inputCls(errors.estimated_delivery_minutes)} />
                        </Field>

                        {/* Logo */}
                        <Field label="Logo" error={errors.logo}>
                            {store?.logo_url && <img src={store.logo_url} alt="Current logo" className="mb-2 h-16 w-16 rounded-xl object-cover" />}
                            <input type="file" accept="image/*" onChange={e => setData('logo', e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-quicky-yellow file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-quicky-black" />
                        </Field>

                        {/* Cover Image */}
                        <Field label="Cover Image" error={errors.cover_image}>
                            {store?.cover_image_url && <img src={store.cover_image_url} alt="Current cover" className="mb-2 h-24 w-full rounded-xl object-cover" />}
                            <input type="file" accept="image/*" onChange={e => setData('cover_image', e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-quicky-yellow file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-quicky-black" />
                        </Field>

                        {/* Toggles */}
                        <div className="grid gap-4 sm:grid-cols-3">
                            {([
                                { key: 'is_active',   label: 'Active (visible on platform)' },
                                { key: 'is_open',     label: 'Currently Open' },
                                { key: 'is_featured', label: 'Featured on Home Page' },
                            ] as const).map(({ key, label }) => (
                                <label key={key} className="flex cursor-pointer items-center gap-2.5">
                                    <div className="relative">
                                        <input type="checkbox" checked={!!data[key]} onChange={e => setData(key, e.target.checked)} className="sr-only" />
                                        <div className={`h-6 w-11 rounded-full transition ${data[key] ? 'bg-quicky-yellow' : 'bg-gray-300'}`} />
                                        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${data[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                    </div>
                                    <span className="text-sm text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button type="submit" disabled={processing} className="rounded-xl bg-quicky-yellow px-6 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition">
                                {processing ? 'Saving…' : isEdit ? 'Update Store' : 'Create Store'}
                            </button>
                            <Link href={route('admin.stores.index')} className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
