import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    const inputCls = (err?: string) =>
        `w-full rounded-xl border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quicky-yellow transition ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`;

    const EyeBtn = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
        <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {show
                ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            }
        </button>
    );

    return (
        <GuestLayout>
            <Head title="Reset Password — Quicky" />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-quicky-yellow/20">
                <svg className="h-7 w-7 text-quicky-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold text-quicky-black">Set new password</h1>
            <p className="mt-2 text-sm text-gray-500">Must be at least 8 characters.</p>

            <form onSubmit={submit} className="mt-8 space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={inputCls(errors.email)}
                        autoComplete="email"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className={inputCls(errors.password)}
                            placeholder="Min. 8 characters"
                            autoFocus
                        />
                        <EyeBtn show={showPassword} toggle={() => setShowPassword(!showPassword)} />
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            className={inputCls(errors.password_confirmation)}
                            placeholder="Re-enter new password"
                        />
                        <EyeBtn show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
                    </div>
                    {data.password_confirmation.length > 0 && (
                        <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${data.password === data.password_confirmation ? 'text-green-600' : 'text-red-500'}`}>
                            {data.password === data.password_confirmation ? '✓ Passwords match' : "✗ Passwords don't match"}
                        </p>
                    )}
                    {errors.password_confirmation && <p className="mt-1 text-xs text-red-600">{errors.password_confirmation}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-quicky-yellow py-3.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition"
                >
                    {processing ? 'Resetting…' : 'Reset Password'}
                </button>
            </form>
        </GuestLayout>
    );
}
