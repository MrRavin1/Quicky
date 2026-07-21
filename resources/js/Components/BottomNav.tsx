/**
 * BottomNav — mobile-only sticky bottom navigation
 *
 * Inspired by Pathao, Foodpanda, Blinkit, Uber Eats.
 * Hidden on lg+ screens via Tailwind (lg:hidden).
 * This is NOT a native app pattern — it's a responsive web pattern.
 * The same routes are accessible from the desktop Header nav.
 */

import { Link, usePage } from '@inertiajs/react';
import { Home, Search, ShoppingCart, ClipboardList, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    { label: 'Home',   href: '/',          icon: Home,          route: 'home' },
    { label: 'Search', href: '/search',     icon: Search,        route: 'search' },
    { label: 'Cart',   href: '/cart',       icon: ShoppingCart,  route: 'cart', badge: true },
    { label: 'Orders', href: '/orders',     icon: ClipboardList, route: 'orders' },
    { label: 'Me',     href: '/dashboard',  icon: User,          route: 'dashboard' },
];

export default function BottomNav() {
    const { totalItems } = useCart();
    const { url } = usePage();

    return (
        // lg:hidden — completely invisible on desktop, only shown on mobile/tablet
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 safe-area-pb">
            <div className="flex items-stretch h-16">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    // Active if current URL starts with tab href (except home — exact match)
                    const isActive = tab.href === '/'
                        ? url === '/'
                        : url.startsWith(tab.href);

                    return (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
                        >
                            <div className="relative">
                                <Icon
                                    className={`h-5 w-5 transition-colors ${
                                        isActive ? 'text-black' : 'text-gray-400'
                                    }`}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                />
                                {/* Cart badge */}
                                <AnimatePresence>
                                    {tab.badge && totalItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-quicky-yellow text-black text-[10px] font-black rounded-full flex items-center justify-center"
                                        >
                                            {totalItems > 9 ? '9+' : totalItems}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                            <span className={`text-[10px] font-semibold transition-colors ${
                                isActive ? 'text-black' : 'text-gray-400'
                            }`}>
                                {tab.label}
                            </span>

                            {/* Active indicator dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-dot"
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-quicky-yellow rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
