import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password — Quicky" />

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-quicky-yellow/20">
                <svg className="h-7 w-7 text-quicky-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold text-quicky-black">Forgot password?</h1>
            <p className="mt-2 text-sm text-gray-500">
                No worries! Enter your email and we'll send you a reset link.
            </p>

            {status && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
                    <input
                        id="email"
                        type="email"
                        autoFocus
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={`w-full rounded-xl border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quicky-yellow transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-quicky-yellow py-3.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition"
                >
                    {processing ? 'Sending…' : 'Send Reset Link'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Remembered it?{' '}
                <Link href={route('login')} className="font-semibold text-quicky-yellow hover:underline">
                    Back to Sign In
                </Link>
            </p>
        </GuestLayout>
    );
}
