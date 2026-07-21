import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    settings: {
        app_name: string;
        app_url: string;
        delivery_fee: number;
        min_order_amount: number;
        max_delivery_radius: number;
        commission_rate: number;
        push_notifications: boolean;
        maintenance_mode: boolean;
    };
}

export default function Settings({ settings }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        delivery_fee:        settings.delivery_fee,
        min_order_amount:    settings.min_order_amount,
        max_delivery_radius: settings.max_delivery_radius,
        commission_rate:     settings.commission_rate,
        push_notifications:  settings.push_notifications,
        maintenance_mode:    settings.maintenance_mode,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    const inputCls = (err?: string) =>
        `w-full rounded-xl border px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-quicky-yellow transition ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`;

    return (
        <>
            <Head title="Settings — Admin" />
            <AdminLayout title="Settings">
                <div className="max-w-2xl space-y-6">

                    {/* App info (read-only) */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4">Application Info</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">App Name</label>
                                <p className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100">{settings.app_name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">App URL</label>
                                <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100 truncate">{settings.app_url}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-gray-400">To change these, edit your <code className="bg-gray-100 px-1 rounded">.env</code> file.</p>
                    </div>

                    {/* Business settings */}
                    <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
                        <h3 className="text-sm font-bold text-gray-800">Business Settings</h3>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Default Delivery Fee (Rs.)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.delivery_fee}
                                    onChange={e => setData('delivery_fee', +e.target.value)}
                                    className={inputCls(errors.delivery_fee)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Min Order Amount (Rs.)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.min_order_amount}
                                    onChange={e => setData('min_order_amount', +e.target.value)}
                                    className={inputCls(errors.min_order_amount)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Delivery Radius (km)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.max_delivery_radius}
                                    onChange={e => setData('max_delivery_radius', +e.target.value)}
                                    className={inputCls(errors.max_delivery_radius)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Platform Commission (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={data.commission_rate}
                                    onChange={e => setData('commission_rate', +e.target.value)}
                                    className={inputCls(errors.commission_rate)}
                                />
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="space-y-4 pt-2 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-gray-700">Feature Flags</h4>

                            {[
                                { key: 'push_notifications', label: 'Push Notifications', desc: 'Enable push notifications for orders and promotions' },
                                { key: 'maintenance_mode',   label: 'Maintenance Mode',   desc: 'Take the site offline for maintenance — admin access still works' },
                            ].map(item => (
                                <div key={item.key} className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData(item.key as any, !(data as any)[item.key])}
                                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${(data as any)[item.key] ? (item.key === 'maintenance_mode' ? 'bg-red-500' : 'bg-quicky-yellow') : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${(data as any)[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-quicky-yellow px-6 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition"
                        >
                            {processing ? 'Saving…' : 'Save Settings'}
                        </button>
                    </form>

                </div>
            </AdminLayout>
        </>
    );
}
