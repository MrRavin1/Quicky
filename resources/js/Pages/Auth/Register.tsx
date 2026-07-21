import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    const inputCls = (err?: string) =>
        `w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quicky-yellow transition ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`;

    const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );

    const EyeButton = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
        <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {show
                ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            }
        </button>
    );

    return (
        <GuestLayout>
            <Head title="Create Account — Quicky" />

            <h1 className="text-2xl font-extrabold text-quicky-black">Create your account 🎉</h1>
            <p className="mt-1 text-sm text-gray-500">Join thousands getting fast deliveries across Nepal</p>

            <form onSubmit={submit} className="mt-8 space-y-4">
                <Field label="Full Name" error={errors.name}>
                    <input
                        type="text"
                        autoComplete="name"
                        autoFocus
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className={inputCls(errors.name)}
                        placeholder="Your full name"
                    />
                </Field>

                <Field label="Email address" error={errors.email}>
                    <input
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={inputCls(errors.email)}
                        placeholder="you@example.com"
                    />
                </Field>

                <Field label="Phone Number" error={(errors as any).phone}>
                    <div className="flex gap-2">
                        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-500">
                            🇳🇵 +977
                        </div>
                        <input
                            type="tel"
                            autoComplete="tel"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className={`flex-1 ${inputCls((errors as any).phone)}`}
                            placeholder="98XXXXXXXX"
                        />
                    </div>
                </Field>

                <Field label="Password" error={errors.password}>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className={inputCls(errors.password)}
                            placeholder="Min. 8 characters"
                        />
                        <EyeButton show={showPassword} toggle={() => setShowPassword(!showPassword)} />
                    </div>
                    {/* Password strength indicator */}
                    {data.password.length > 0 && (
                        <div className="mt-2 flex gap-1">
                            {[1,2,3,4].map(i => (
                                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                                    data.password.length >= i * 3
                                        ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-orange-400' : i <= 3 ? 'bg-yellow-400' : 'bg-green-400'
                                        : 'bg-gray-200'
                                }`} />
                            ))}
                        </div>
                    )}
                </Field>

                <Field label="Confirm Password" error={errors.password_confirmation}>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            className={inputCls(errors.password_confirmation)}
                            placeholder="Re-enter password"
                        />
                        <EyeButton show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
                    </div>
                    {/* Match indicator */}
                    {data.password_confirmation.length > 0 && (
                        <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${data.password === data.password_confirmation ? 'text-green-600' : 'text-red-500'}`}>
                            {data.password === data.password_confirmation
                                ? <><span>✓</span> Passwords match</>
                                : <><span>✗</span> Passwords don't match</>
                            }
                        </p>
                    )}
                </Field>

                {/* Terms */}
                <p className="text-xs text-gray-400">
                    By creating an account you agree to our{' '}
                    <a href="#" className="font-medium text-quicky-yellow hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="font-medium text-quicky-yellow hover:underline">Privacy Policy</a>.
                </p>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-quicky-yellow py-3.5 text-sm font-bold text-quicky-black hover:bg-quicky-yellow-dark disabled:opacity-60 transition"
                >
                    {processing ? 'Creating account…' : 'Create Account'}
                </button>

                {/* Divider */}
                <div className="relative flex items-center gap-3">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="flex-1 border-t border-gray-200" />
                </div>

                <a
                    href="/auth/facebook"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Sign up with Facebook
                </a>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link href={route('login')} className="font-semibold text-quicky-yellow hover:underline">
                    Sign in
                </Link>
            </p>
        </GuestLayout>
    );
}
