import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email — Quicky" />

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-quicky-yellow/20">
                <svg className="h-7 w-7 text-quicky-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold text-quicky-black">Check your email 📬</h1>
            <p className="mt-2 text-sm text-gray-500">
                We sent a verification link to your email address. Click the link to verify and start ordering.
            </p>

            {status === 'verification-link-sent' && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    A new verification link has been sent to your email.
                </div>
            )}

            {/* Steps */}
            <div className="mt-6 space-y-3">
                {[
                    { step: '1', text: 'Open your email inbox' },
                    { step: '2', text: 'Find the email from Quicky' },
                    { step: '3', text: 'Click the verification link' },
                ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-quicky-yellow text-xs font-bold text-quicky-black">
                            {item.step}
                        </div>
                        <p className="text-sm text-gray-600">{item.text}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={submit} className="mt-8">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-quicky-yellow py-3.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition"
                >
                    {processing ? 'Sending…' : 'Resend Verification Email'}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
                Wrong account?{' '}
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="font-semibold text-quicky-yellow hover:underline"
                >
                    Sign out
                </Link>
            </p>
        </GuestLayout>
    );
}
