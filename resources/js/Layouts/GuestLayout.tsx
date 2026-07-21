import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import logo from '../images/logo.png';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen font-sans antialiased">
            {/* Left panel — branding (hidden on mobile) */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-quicky-yellow p-10 lg:flex">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-quicky-yellow-light opacity-50" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-quicky-yellow-dark opacity-40" />

                {/* Logo */}
                <Link href={route('home')} className="relative flex items-center gap-2">
                    <img src="/logo.png" alt="Quicky" className="h-14 w-auto" />
                </Link>

                {/* Center content */}
                <div className="relative">
                    <h2 className="text-4xl font-extrabold leading-tight text-quicky-black">
                        Fast Delivery<br />Across Nepal 🚀
                    </h2>
                    <p className="mt-4 text-lg text-quicky-black/70">
                        Food, groceries, medicine & parcels — delivered in minutes. One app for everything.
                    </p>

                    {/* Feature list */}
                    <ul className="mt-8 space-y-3">
                        {[
                            { icon: '🍔', text: 'Food from your favourite restaurants' },
                            { icon: '🛒', text: 'Daily groceries & essentials' },
                            { icon: '💊', text: 'Medicine delivered safely' },
                            { icon: '📦', text: 'Parcels sent across the city' },
                        ].map((item) => (
                            <li key={item.text} className="flex items-center gap-3 text-sm font-medium text-quicky-black/80">
                                <span className="text-xl">{item.icon}</span>
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom testimonial */}
                <div className="relative rounded-2xl bg-white/40 p-4 backdrop-blur-sm">
                    <p className="text-sm italic text-quicky-black/70">
                        "Ordered dinner at 7pm and it arrived in 25 minutes — still hot!"
                    </p>
                    <p className="mt-2 text-xs font-semibold text-quicky-black">— Sita S., Birtamode</p>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 sm:px-10">
                {/* Mobile logo */}
                <div className="mb-8 lg:hidden">
                    <Link href={route('home')} className="flex items-center gap-2">
                        <img src="/logo.png" alt="Quicky" className="h-12 w-auto" />
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
