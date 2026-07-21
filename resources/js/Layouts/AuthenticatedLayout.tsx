import { Link, usePage, router } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    MapPin,
    Bell,
    User,
    LogOut,
    ChevronRight,
    Menu,
    X,
    Home,
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard',     href: '/dashboard',          icon: LayoutDashboard, route: 'dashboard' },
    { label: 'My Orders',     href: '/orders',             icon: ShoppingBag,     route: 'orders' },
    { label: 'Wishlist',      href: '/wishlist',           icon: Heart,           route: 'wishlist' },
    { label: 'Addresses',     href: '/addresses',          icon: MapPin,          route: 'addresses' },
    { label: 'Notifications', href: '/notifications',      icon: Bell,            route: 'notifications' },
    { label: 'Profile',       href: '/profile',            icon: User,            route: 'profile.edit' },
];

function Sidebar({ user, onClose }: { user: any; onClose?: () => void }) {
    const currentRoute = route().current();

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="flex h-full flex-col bg-white border-r border-gray-100">
            {/* Logo */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Quicky" className="h-10 w-auto" />
                </Link>
                {onClose && (
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                )}
            </div>

            {/* User card */}
            <div className="px-4 py-5 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-quicky-yellow flex items-center justify-center shrink-0">
                        <span className="text-base font-black text-black">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = route().current(item.route);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                                isActive
                                    ? 'bg-quicky-yellow text-black'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`} />
                            {item.label}
                            {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="px-3 py-4 border-t border-gray-100 space-y-0.5 shrink-0">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                    <Home className="h-4.5 w-4.5 text-gray-400" />
                    Back to Home
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-4.5 w-4.5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default function AuthenticatedLayout({
    children,
    header,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-30">
                <Sidebar user={user} />
            </aside>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden"
                        >
                            <Sidebar user={user} onClose={() => setSidebarOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-20 bg-white border-b border-gray-100 h-16 flex items-center px-4 sm:px-6 gap-4">
                    {/* Hamburger — mobile */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <Menu className="h-5 w-5 text-gray-600" />
                    </button>

                    {/* Page title */}
                    <div className="flex-1">
                        {header && (
                            <div className="text-sm sm:text-base font-bold text-gray-900">
                                {header}
                            </div>
                        )}
                    </div>

                    {/* Right: notifications + avatar */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="/notifications"
                            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Bell className="h-5 w-5 text-gray-600" />
                            {/* Unread badge */}
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                        </Link>

                        <Link
                            href="/profile"
                            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="h-7 w-7 rounded-full bg-quicky-yellow flex items-center justify-center">
                                <span className="text-xs font-black text-black">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="hidden sm:inline text-sm font-semibold text-gray-700">
                                {user?.name?.split(' ')[0]}
                            </span>
                        </Link>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
