import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RiderForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '', email: '', password: '', phone: '', vehicle_type: 'motorcycle', license_no: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.riders.store'));
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
            <Head title="Add In-House Rider" />
            <AdminLayout title="Add In-House Rider">
                <div className="max-w-xl">
                    <div className="mb-4">
                        <Link href={route('admin.riders.index')} className="text-sm text-gray-500 hover:text-quicky-yellow transition">← Back to Riders</Link>
                    </div>

                    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6">
                        <Field label="Full Name *" error={errors.name}>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={inputCls(errors.name)} placeholder="Rider's full name" />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Email *" error={errors.email}>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className={inputCls(errors.email)} />
                            </Field>
                            <Field label="Password *" error={errors.password}>
                                <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className={inputCls(errors.password)} placeholder="Min 8 characters" />
                            </Field>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Phone *" error={errors.phone}>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className={inputCls(errors.phone)} placeholder="98XXXXXXXX" />
                            </Field>
                            <Field label="Vehicle Type *" error={errors.vehicle_type}>
                                <select value={data.vehicle_type} onChange={e => setData('vehicle_type', e.target.value)} className={inputCls(errors.vehicle_type)}>
                                    <option value="motorcycle">Motorcycle</option>
                                    <option value="bicycle">Bicycle</option>
                                    <option value="car">Car</option>
                                </select>
                            </Field>
                        </div>
                        <Field label="License Number" error={errors.license_no}>
                            <input type="text" value={data.license_no} onChange={e => setData('license_no', e.target.value)} className={inputCls(errors.license_no)} placeholder="Optional" />
                        </Field>

                        <div className="flex items-center gap-3 pt-2">
                            <button type="submit" disabled={processing} className="rounded-xl bg-quicky-yellow px-6 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition">
                                {processing ? 'Creating…' : 'Create Rider'}
                            </button>
                            <Link href={route('admin.riders.index')} className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Cancel</Link>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
