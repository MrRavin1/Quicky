import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { PageProps } from '@/types';
import { useCart } from '@/context/CartContext';

interface Props {
    auth: PageProps['auth'];
    canLogin: boolean;
    canRegister: boolean;
}

const navLinks = [
    { label: 'Food', href: '/stores?category=food' },
    { label: 'Grocery', href: '/stores?category=grocery' },
    { label: 'Pharmacy', href: '/stores?category=pharmacy' },
    { label: 'Parcel', href: '/stores?category=parcel' },
];

export default function Header({ auth, canLogin, canRegister }: Props) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { totalItems } = useCart();
    const isLoggedIn = !!auth?.user;

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 lg:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img src="/logo.png" alt="Quicky" className="h-14 w-auto" />
                    </Link>

                    {/* Location pill — desktop only */}
                    <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors">
                        <MapPin className="h-4 w-4 text-quicky-yellow shrink-0" />
                        <span>Kathmandu</span>
                        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                    </button>

                    {/* Nav links — desktop */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Search icon — tablet/mobile */}
                        <Link
                            href="/search"
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                            <Search className="h-5 w-5" />
                        </Link>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {/* Cart badge — shown when items exist */}
                            {/* <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-quicky-yellow text-black text-xs font-bold rounded-full flex items-center justify-center">3</span> */}
                        </Link>

                        {/* Auth */}
                        {isLoggedIn ? (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <div className="h-6 w-6 bg-quicky-yellow rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-black">
                                        {auth?.user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="hidden sm:inline text-sm font-medium text-gray-800">
                                    {auth?.user?.name?.split(' ')[0]}
                                </span>
                            </Link>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                {canLogin && (
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Login
                                    </Link>
                                )}
                                {canRegister && (
                                    <Link
                                        href="/register"
                                        className="px-4 py-2 text-sm font-bold text-black bg-quicky-yellow hover:bg-quicky-yellow-dark rounded-lg transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Hamburger — mobile */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/40 z-50 lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col lg:hidden"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
                                <img src="/logo.png" alt="Quicky" className="h-9 w-auto" />
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Location */}
                            <div className="px-5 py-4 border-b border-gray-100">
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <MapPin className="h-4 w-4 text-quicky-yellow" />
                                    <span>Kathmandu</span>
                                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/offers"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Offers
                                </Link>
                            </nav>

                            {/* Auth footer */}
                            <div className="px-5 py-5 border-t border-gray-100 space-y-3">
                                {isLoggedIn ? (
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl"
                                    >
                                        <div className="h-8 w-8 bg-quicky-yellow rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-black">
                                                {auth?.user?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{auth?.user?.name}</p>
                                            <p className="text-xs text-gray-500">View Dashboard</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link
                                                href="/login"
                                                onClick={() => setMobileOpen(false)}
                                                className="block w-full text-center px-4 py-3 text-sm font-semibold text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                Login
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link
                                                href="/register"
                                                onClick={() => setMobileOpen(false)}
                                                className="block w-full text-center px-4 py-3 text-sm font-bold text-black bg-quicky-yellow hover:bg-quicky-yellow-dark rounded-xl transition-colors"
                                            >
                                                Sign up free
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
