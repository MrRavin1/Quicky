import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

const STATUS_STEPS = ['placed', 'confirmed', 'preparing', 'picked_up', 'on_the_way', 'delivered'];
const STATUS_COLORS: Record<string, string> = {
    placed: 'bg-blue-100 text-blue-700', confirmed: 'bg-indigo-100 text-indigo-700',
    preparing: 'bg-yellow-100 text-yellow-700', picked_up: 'bg-orange-100 text-orange-700',
    on_the_way: 'bg-purple-100 text-purple-700', delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

export default function OrderShow({ order }: { order: any }) {
    const { data, setData, patch, processing } = useForm({ status: order.status });

    const updateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        router.patch(route('admin.orders.update-status', order.id), { status: data.status });
    };

    const stepIndex = STATUS_STEPS.indexOf(order.status);

    return (
        <>
            <Head title={`Order #${order.id}`} />
            <AdminLayout title={`Order #${order.id}`}>
                <div className="mb-4">
                    <Link href={route('admin.orders.index')} className="text-sm text-gray-500 hover:text-quicky-yellow transition">← Back to Orders</Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left: details */}
                    <div className="space-y-5 lg:col-span-2">
                        {/* Status timeline */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <h3 className="mb-4 text-sm font-bold text-gray-700">Order Progress</h3>
                            {order.status === 'cancelled' ? (
                                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">This order has been cancelled.</p>
                            ) : (
                                <div className="flex items-center gap-1 overflow-x-auto pb-2">
                                    {STATUS_STEPS.map((s, i) => (
                                        <div key={s} className="flex shrink-0 items-center gap-1">
                                            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= stepIndex ? 'bg-quicky-yellow text-quicky-black' : 'bg-gray-100 text-gray-400'}`}>
                                                {i < stepIndex ? '✓' : i + 1}
                                            </div>
                                            <span className={`text-xs ${i <= stepIndex ? 'font-semibold text-gray-700' : 'text-gray-400'}`}>{s.replace('_', ' ')}</span>
                                            {i < STATUS_STEPS.length - 1 && <div className={`mx-1 h-0.5 w-6 ${i < stepIndex ? 'bg-quicky-yellow' : 'bg-gray-200'}`} />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Order items */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <h3 className="mb-4 text-sm font-bold text-gray-700">Items Ordered</h3>
                            {order.items?.length === 0 ? <p className="text-sm text-gray-400">No items.</p> : (
                                <div className="space-y-3">
                                    {order.items?.map((item: any) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{item.product?.name}</p>
                                                <p className="text-xs text-gray-400">Rs. {Number(item.unit_price).toLocaleString()} × {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800">Rs. {Number(item.subtotal).toLocaleString()}</p>
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
                                        <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>Rs. {Number(order.subtotal).toLocaleString()}</span></div>
                                        <div className="flex justify-between text-gray-500"><span>Delivery Fee</span><span>Rs. {Number(order.delivery_fee).toLocaleString()}</span></div>
                                        {Number(order.discount) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>- Rs. {Number(order.discount).toLocaleString()}</span></div>}
                                        <div className="flex justify-between font-bold text-gray-800"><span>Total</span><span>Rs. {Number(order.total_amount).toLocaleString()}</span></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: meta */}
                    <div className="space-y-5">
                        {/* Update status */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <h3 className="mb-3 text-sm font-bold text-gray-700">Update Status</h3>
                            <form onSubmit={updateStatus} className="space-y-3">
                                <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-2 focus:ring-quicky-yellow">
                                    {['placed','confirmed','preparing','picked_up','on_the_way','delivered','cancelled'].map(s => (
                                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                    ))}
                                </select>
                                <button type="submit" disabled={processing} className="w-full rounded-xl bg-quicky-yellow py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition">
                                    {processing ? 'Updating…' : 'Update Status'}
                                </button>
                            </form>
                        </div>

                        {/* Customer */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
                            <h3 className="text-sm font-bold text-gray-700">Customer</h3>
                            <p className="text-sm text-gray-800">{order.customer?.name}</p>
                            <p className="text-xs text-gray-500">{order.customer?.email}</p>
                            <p className="text-xs text-gray-500">{order.customer?.phone}</p>
                        </div>

                        {/* Store */}
                        {order.store && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
                                <h3 className="text-sm font-bold text-gray-700">Store</h3>
                                <p className="text-sm text-gray-800">{order.store.name}</p>
                                <p className="text-xs text-gray-500">{order.store.address}</p>
                            </div>
                        )}

                        {/* Delivery */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
                            <h3 className="text-sm font-bold text-gray-700">Delivery</h3>
                            <p className="text-xs text-gray-500">{order.delivery_address}</p>
                            <p className="text-xs text-gray-500 capitalize">Payment: {order.payment_method} — <span className={`font-semibold ${order.payment_status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>{order.payment_status}</span></p>
                            {order.notes && <p className="text-xs italic text-gray-400">"{order.notes}"</p>}
                        </div>

                        {/* Rider */}
                        {order.rider && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
                                <h3 className="text-sm font-bold text-gray-700">Rider</h3>
                                <p className="text-sm text-gray-800">{order.rider.user?.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
