import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Coupon {
    id?: number;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    min_order_amount: number | null;
    max_discount_amount: number | null;
    usage_limit: number | null;
    is_active: boolean;
    expires_at: string | null;
}

interface Props {
    coupon: Coupon | null;
}

export default function CouponForm({ coupon }: Props) {
    const isEdit = !!coupon?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        code:                coupon?.code ?? '',
        type:                coupon?.type ?? 'percentage',
        value:               coupon?.value ?? '',
        min_order_amount:    coupon?.min_order_amount ?? '',
        max_discount_amount: coupon?.max_discount_amount ?? '',
        usage_limit:         coupon?.usage_limit ?? '',
        is_active:           coupon?.is_active ?? true,
        expires_at:          coupon?.expires_at ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.coupons.update', coupon!.id));
        } else {
            post(route('admin.coupons.store'));
        }
    };

    const inputCls = (err?: string) =>
        `w-full rounded-xl border px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-quicky-yellow transition ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`;

    return (
        <>
            <Head title={`${isEdit ? 'Edit' : 'New'} Coupon — Admin`} />
            <AdminLayout title={isEdit ? 'Edit Coupon' : 'Create Coupon'}>
                <div className="max-w-xl">
                    <div className="mb-6">
                        <Link href={route('admin.coupons.index')} className="text-sm text-gray-500 hover:text-quicky-yellow transition">
                            ← Back to Coupons
                        </Link>
                    </div>

                    <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">

                        {/* Code */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Coupon Code</label>
                            <input
                                type="text"
                                value={data.code}
                                onChange={e => setData('code', e.target.value.toUpperCase())}
                                placeholder="e.g. FIRST50"
                                className={inputCls(errors.code)}
                            />
                            {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
                        </div>

                        {/* Type + Value */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Discount Type</label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value as any)}
                                    className={inputCls(errors.type)}
                                >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount (Rs.)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Value {data.type === 'percentage' ? '(%)' : '(Rs.)'}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.value}
                                    onChange={e => setData('value', e.target.value as any)}
                                    placeholder={data.type === 'percentage' ? '10' : '100'}
                                    className={inputCls(errors.value)}
                                />
                                {errors.value && <p className="mt-1 text-xs text-red-600">{errors.value}</p>}
                            </div>
                        </div>

                        {/* Min order + Max discount */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Min Order (Rs.)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.min_order_amount}
                                    onChange={e => setData('min_order_amount', e.target.value as any)}
                                    placeholder="Optional"
                                    className={inputCls(errors.min_order_amount)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Discount (Rs.)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.max_discount_amount}
                                    onChange={e => setData('max_discount_amount', e.target.value as any)}
                                    placeholder="Optional"
                                    className={inputCls(errors.max_discount_amount)}
                                />
                            </div>
                        </div>

                        {/* Usage limit + Expiry */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Usage Limit</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.usage_limit}
                                    onChange={e => setData('usage_limit', e.target.value as any)}
                                    placeholder="Unlimited"
                                    className={inputCls(errors.usage_limit)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expires At</label>
                                <input
                                    type="date"
                                    value={data.expires_at}
                                    onChange={e => setData('expires_at', e.target.value)}
                                    className={inputCls(errors.expires_at)}
                                />
                            </div>
                        </div>

                        {/* Active toggle */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setData('is_active', !data.is_active)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.is_active ? 'bg-quicky-yellow' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${data.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className="text-sm font-medium text-gray-700">
                                {data.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-quicky-yellow px-6 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition"
                            >
                                {processing ? 'Saving…' : isEdit ? 'Update Coupon' : 'Create Coupon'}
                            </button>
                            <Link
                                href={route('admin.coupons.index')}
                                className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
