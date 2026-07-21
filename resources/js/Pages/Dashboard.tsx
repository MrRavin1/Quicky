import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    MapPin,
    Heart,
    Bell,
    ArrowRight,
    Clock,
    CheckCircle,
    Truck,
    Package,
} from 'lucide-react';

const quickActions = [
    { label: 'Order Food',   href: '/stores?category=food',     emoji: '🍔', color: 'bg-orange-50 hover:bg-orange-100 border-orange-100' },
    { label: 'Grocery',      href: '/stores?category=grocery',  emoji: '🛒', color: 'bg-green-50 hover:bg-green-100 border-green-100' },
    { label: 'Pharmacy',     href: '/stores?category=pharmacy', emoji: '💊', color: 'bg-blue-50 hover:bg-blue-100 border-blue-100' },
    { label: 'Send Parcel',  href: '/stores?category=parcel',   emoji: '📦', color: 'bg-purple-50 hover:bg-purple-100 border-purple-100' },
];

const statCards = [
    { label: 'Total Orders',    value: '0',   icon: ShoppingBag, color: 'text-blue-600',   bg: 'bg-blue-50' },
    { label: 'Saved Addresses', value: '0',   icon: MapPin,      color: 'text-green-600',  bg: 'bg-green-50' },
    { label: 'Wishlist Items',  value: '0',   icon: Heart,       color: 'text-rose-600',   bg: 'bg-rose-50' },
    { label: 'Notifications',   value: '0',   icon: Bell,        color: 'text-amber-600',  bg: 'bg-amber-50' },
];

// Order status display helper
const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending:    { label: 'Pending',    color: 'text-amber-600 bg-amber-50',   icon: Clock },
    preparing:  { label: 'Preparing', color: 'text-blue-600 bg-blue-50',     icon: Package },
    on_the_way: { label: 'On the Way', color: 'text-purple-600 bg-purple-50', icon: Truck },
    delivered:  { label: 'Delivered',  color: 'text-green-600 bg-green-50',   icon: CheckCircle },
};

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const firstName = user?.name?.split(' ')[0] ?? 'there';

    // These will come from the API in future phases
    const recentOrders: any[] = [];

    return (
        <AuthenticatedLayout header="My Dashboard">
            <Head title="Dashboard — Quicky" />

            <div className="max-w-5xl mx-auto space-y-8">

                {/* Welcome banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-quicky-yellow to-amber-400 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
                >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15" />
                    <div className="pointer-events-none absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10" />

                    <div className="relative">
                        <h1 className="text-2xl sm:text-3xl font-black text-black">
                            Hey, {firstName}! 👋
                        </h1>
                        <p className="mt-1 text-sm sm:text-base text-black/70 font-medium">
                            What would you like delivered today?
                        </p>

                        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {quickActions.map((action, i) => (
                                <motion.div
                                    key={action.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + i * 0.06 }}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <Link
                                        href={action.href}
                                        className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border bg-white/90 hover:bg-white transition-all text-center`}
                                    >
                                        <span className="text-2xl">{action.emoji}</span>
                                        <span className="text-xs font-bold text-gray-800">{action.label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.07 }}
                                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                            >
                                <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500 mt-0.5 font-medium">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                        <h2 className="font-bold text-gray-900">Recent Orders</h2>
                        <Link
                            href="/orders"
                            className="flex items-center gap-1 text-xs font-semibold text-quicky-yellow-dark hover:underline"
                        >
                            View all
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {recentOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                            <div className="text-5xl mb-4">🛍️</div>
                            <h3 className="font-bold text-gray-900 mb-1">No orders yet</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Your orders will appear here once you place one
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-quicky-yellow hover:bg-quicky-yellow-dark text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                            >
                                Start ordering
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {recentOrders.map((order) => {
                                const status = statusConfig[order.status] ?? statusConfig.pending;
                                const StatusIcon = status.icon;
                                return (
                                    <Link
                                        key={order.id}
                                        href={`/orders/${order.id}`}
                                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="h-10 w-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                                            🍔
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-900 truncate">
                                                {order.store_name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {order.items_count} items · Rs. {order.total}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.color}`}>
                                            <StatusIcon className="h-3.5 w-3.5" />
                                            {status.label}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                {/* Account quick links */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    {[
                        { label: 'Manage Addresses',  desc: 'Add or edit delivery locations', href: '/addresses',     emoji: '📍' },
                        { label: 'My Wishlist',        desc: 'Items you saved for later',      href: '/wishlist',      emoji: '❤️' },
                        { label: 'Edit Profile',       desc: 'Update your personal info',      href: '/profile',       emoji: '👤' },
                    ].map((card, i) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-gray-200 transition-all group"
                        >
                            <span className="text-2xl">{card.emoji}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-gray-900">{card.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{card.desc}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                        </Link>
                    ))}
                </motion.div>

            </div>
        </AuthenticatedLayout>
    );
}

// Need ChevronRight import
import { ChevronRight } from 'lucide-react';
