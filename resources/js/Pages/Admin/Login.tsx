import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function AdminLogin({ status }: { status?: string }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.login.store'), { onFinish: () => reset('password') });
    };

    const inputCls = (err?: string) =>
        `w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quicky-yellow transition ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`;

    return (
        <div className="flex min-h-screen items-center justify-center bg-quicky-black px-4">
            <Head title="Admin Login — Quicky" />

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center">
                    <img src="/logo.png" alt="Quicky" className="h-16 w-auto brightness-0 invert mb-2" />
                    <p className="mt-1 text-sm text-gray-400">Sign in to the admin panel</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                    {status && (
                        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className={inputCls(errors.email)}
                                placeholder="admin@quicky.com.np"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={inputCls(errors.password)}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember me */}
                        <label className="flex cursor-pointer items-center gap-2.5">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked as false)}
                                    className="sr-only"
                                />
                                <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition ${data.remember ? 'border-quicky-yellow bg-quicky-yellow' : 'border-gray-300 bg-white'}`}>
                                    {data.remember && (
                                        <svg className="h-3 w-3 text-quicky-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm text-gray-600">Keep me signed in</span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-quicky-yellow py-3.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition"
                        >
                            {processing ? 'Signing in…' : 'Sign In to Admin Panel'}
                        </button>
                    </form>
                </div>

                {/* Back to site */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    <a href="/" className="text-gray-400 hover:text-quicky-yellow transition">
                        ← Back to site
                    </a>
                </p>
            </div>
        </div>
    );
}
