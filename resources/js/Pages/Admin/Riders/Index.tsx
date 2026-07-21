import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Rider {
    id: number;
    name: string;
    email: string;
    phone: string;
    vehicle_type: string;
    source: string;
    verification_status: string | null;
    is_active: boolean;
    is_online: boolean;
    rejection_reason: string | null;
    id_document_url: string | null;
    created_at: string;
}

interface Props {
    riders: { data: Rider[]; links: any[]; meta: any };
    filters: { search?: string; status?: string };
}

export default function RidersIndex({ riders, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [rejectId, setRejectId] = useState<number | null>(null);
    const [rejectReason, setRejectReason] = useState('');

    const applyFilters = (s = status) => {
        router.get(route('admin.riders.index'), { search, status: s }, { preserveState: true, replace: true });
    };

    const approve = (id: number) => {
        router.patch(route('admin.riders.approve', id));
    };

    const submitReject = () => {
        if (!rejectId) return;
        router.patch(route('admin.riders.reject', rejectId), { rejection_reason: rejectReason }, {
            onSuccess: () => { setRejectId(null); setRejectReason(''); },
        });
    };

    const toggleActive = (id: number) => {
        router.patch(route('admin.riders.toggle-active', id));
    };

    return (
        <>
            <Head title="Riders — Admin" />
            <AdminLayout title="Riders">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">{riders.meta?.total ?? 0} riders total</p>
                    <Link href={route('admin.riders.create')} className="inline-flex items-center gap-2 rounded-xl bg-quicky-yellow px-4 py-2.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark transition">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add In-House Rider
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-4 flex flex-wrap gap-3">
                    <input type="text" placeholder="Search riders…" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyFilters()} className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-1 focus:ring-quicky-yellow" />
                    {['', 'pending', 'active', 'inactive'].map((s) => (
                        <button key={s} onClick={() => { setStatus(s); applyFilters(s); }} className={`rounded-xl px-3 py-2 text-sm font-medium transition ${status === s ? 'bg-quicky-yellow text-quicky-black' : 'bg-white border border-gray-200 text-gray-600 hover:border-quicky-yellow'}`}>
                            {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {['Rider', 'Phone', 'Vehicle', 'Source', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {riders.data.length === 0 ? (
                                    <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No riders found.</td></tr>
                                ) : riders.data.map((rider) => (
                                    <tr key={rider.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-gray-800">{rider.name}</p>
                                            <p className="text-xs text-gray-400">{rider.email}</p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{rider.phone}</td>
                                        <td className="px-4 py-3 capitalize text-gray-600">{rider.vehicle_type}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${rider.source === 'in_house' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {rider.source === 'in_house' ? 'In-House' : 'Public'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {rider.source === 'in_house' ? (
                                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${rider.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {rider.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            ) : (
                                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                                                    rider.verification_status === 'approved' ? 'bg-green-100 text-green-700'
                                                    : rider.verification_status === 'rejected' ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {rider.verification_status ?? 'pending'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-2">
                                                {rider.source === 'public_applicant' && rider.verification_status === 'pending' && (
                                                    <>
                                                        <button onClick={() => approve(rider.id)} className="rounded-lg bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 transition">Approve</button>
                                                        <button onClick={() => setRejectId(rider.id)} className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition">Reject</button>
                                                    </>
                                                )}
                                                {rider.id_document_url && (
                                                    <a href={rider.id_document_url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition">View ID</a>
                                                )}
                                                <button onClick={() => toggleActive(rider.id)} className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition">
                                                    {rider.is_active ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reject Modal */}
                {rejectId !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                            <h3 className="text-base font-bold text-gray-800">Reject Rider Application</h3>
                            <p className="mt-1 text-sm text-gray-500">Please provide a reason so the applicant knows what to fix.</p>
                            <textarea
                                className="mt-4 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-quicky-yellow focus:outline-none focus:ring-2 focus:ring-quicky-yellow"
                                rows={4}
                                placeholder="e.g. ID document unclear, please re-upload."
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                            />
                            <div className="mt-4 flex gap-3">
                                <button onClick={submitReject} disabled={!rejectReason.trim()} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50 transition">
                                    Reject
                                </button>
                                <button onClick={() => { setRejectId(null); setRejectReason(''); }} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}
